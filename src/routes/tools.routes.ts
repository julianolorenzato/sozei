import { Router } from 'express'

import { createToolController } from '../modules/tool-storage/useCases/tool/create-tool'
import { deleteToolController } from '../modules/tool-storage/useCases/tool/delete-tool'
import { listToolsController } from '../modules/tool-storage/useCases/tool/list-tools'

import { ensureAuthenticated } from '../shared/infra/http/middleware/EnsureAuthenticatedMiddleware'

const toolsRouter = Router()

toolsRouter.use(ensureAuthenticated)
toolsRouter.post('/', (req, res) => createToolController().handle(req, res))
toolsRouter.get('/', (req, res) => listToolsController().handle(req, res))
toolsRouter.delete('/:id', (req, res) =>
	deleteToolController().handle(req, res)
)

export { toolsRouter }
