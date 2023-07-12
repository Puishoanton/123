import User from './models/User.js'
import Role from './models/Role.js'
import bcrypt from 'bcryptjs'
import generateAccessToken from './generateAccessToken.js'

class authService {
  async registerUser(username, password) {
    const candidate = await User.findOne({ username })
    if (candidate) {
      return new Error(`User ${candidate.username} already exist`).message
    }

    const hashPassword = bcrypt.hashSync(password, 5)
    const userRole = await Role.findOne({ value: 'ADMIN' })
    console.log(userRole.value)
    const newUser = new User({ username, password: hashPassword, roles: userRole.value })
    await newUser.save()
    return newUser
  }
  async loginUser(username, password) {
    const user = await User.findOne({ username })
    if (!user) {
      return new Error('User not found').message
    }

    const passwordComparing = bcrypt.compareSync(password, user.password)
    if (!passwordComparing) {
      return new Error('Incorrect password')
    }

    const token = generateAccessToken(user._id, user.roles)
    return token
  }
  async createRole(value) {
    if (!value) {
      return new Error(`Role can't be empty`).message
    }
    const createdRole = await Role.findOne({ value })
    if (createdRole) {
      return new Error(`Role ${createdRole.value} already exist`).message
    }
    const addedRole = new Role({ value })
    await addedRole.save()

    return value
  }
  async getUsers() {
    return await User.find()
  }
}

export default new authService()
