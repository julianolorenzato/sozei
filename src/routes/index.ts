import { Router } from 'express'

import { authRouter } from './auth.routes'
import { toolsRouter } from './tools.routes'
import { tasksRouter } from './tasks.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/tools', toolsRouter)
router.use('/tasks', tasksRouter)

export { router }
