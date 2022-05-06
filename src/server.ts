import express from 'express'

import { router } from './routes'

import './shared/infra/typeorm'

const app = express()

app.use(express.json())

app.use(router)

app.listen(3000, () => console.log('Server listening on 3000 port'))
