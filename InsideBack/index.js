import express from 'express'
import 'dotenv/config'
import { createPersonRouter } from './routes/personRouter.js'
import { PersonModel } from './models/personModel.js'

const app = express()
app.use(express.json())

app.use('/api/person', createPersonRouter({ PersonModel }))

const PORT = 1234 ?? process.env.PORT
app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
