import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

import { router } from './routes'

import './shared/infra/typeorm'

const app = express()

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(router)

app.listen(3000, () => console.log('Server listening on 3000 port'))
