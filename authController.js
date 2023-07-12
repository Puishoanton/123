import authService from './authService.js'
import { validationResult } from 'express-validator'

class authController {
  async register(req, res) {
    try {
      if (!validationResult(req).isEmpty()) {
        return res.status(400).json(validationResult(req))
      }

      const newUser = await authService.registerUser(req.body.username, req.body.password)
      return res.json(newUser)
    } catch (e) {
      res.status(400).json(`Something went wrong during registration: ${e.message}`)
    }
  }
  async login(req, res) {
    try {
      const token = await authService.loginUser(req.body.username, req.body.password)
      return res.json({ token })
    } catch (e) {
      res.status(400).json(`Something went wrong during login: ${e.message}`)
    }
  }
  async createRole(req, res) {
    try {
      const value = await authService.createRole(req.value)
      res.json(`Role ${value} was created`)
    } catch (e) {
      res.status(400).json(`Something went wrong: ${e.message}`)
    }
  }
  async getUsers(_, res) {
    try {
      const users = await authService.getUsers()
      res.json(users)
    } catch (e) {
      res.status(400).json(`Something went wrong: ${e.message}`)
    }
  }
}
export default new authController()
