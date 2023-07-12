import { Router } from 'express'
import authController from './authController.js'
import { check } from 'express-validator'
import authMiddleware from './middleware/authMiddleware.js'
import roleMiddleware from './middleware/roleMiddleware.js'

const router = new Router()

router.post(
  '/register',
  [
    check('username', 'Username can not be empty').notEmpty(),
    check('password', 'Password can not be shorter 4 and longer 10 chapters').isLength({
      min: 4,
      max: 10,
    }),
  ],
  authController.register
)
router.post('/login', authController.login)
router.post('/create-role', authController.createRole)
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)

export default router
