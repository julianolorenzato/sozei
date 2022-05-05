import { Router } from 'express'

import { createTaskController } from '../modules/tool-storage/useCases/task/create-task'

import { ensureAuthenticated } from '../shared/infra/http/middleware/EnsureAuthenticatedMiddleware'

const tasksRouter = Router()

tasksRouter.use(ensureAuthenticated)
tasksRouter.post('/', (req, res) => createTaskController().handle(req, res))

export { tasksRouter }
