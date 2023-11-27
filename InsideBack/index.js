import express from 'express'
import 'dotenv/config'

// routers
import { createPersonRouter } from './routes/personRouter.js'
import { createEmpleadoRouter } from './routes/empleadoRouter.js'
import { createVehiculoRouter } from './routes/vehiculoRouter.js'
<<<<<<< HEAD
import { createMovimientoRouter } from './routes/movimientoRouter.js'
=======
import { createNoticiaRouter } from './routes/noticiaRouter.js'
>>>>>>> fd1dad8388555bc0f1bd42925348a30467605051

// models
import { PersonModel } from './models/personModel.js'
import { EmpleadoModel } from './models/empleadoModel.js'
import { VehiculoModel } from './models/vehiculoModel.js'
<<<<<<< HEAD
import { MovimientoModel } from './models/movimientoModel.js'
=======
import { NoticiaModel } from './models/noticiaModel.js'
>>>>>>> fd1dad8388555bc0f1bd42925348a30467605051

const app = express()
app.use(express.json())

app.use('/api/person', createPersonRouter({ PersonModel }))
app.use('/api/empleado', createEmpleadoRouter({ EmpleadoModel }))
app.use('/api/vehiculo', createVehiculoRouter({ VehiculoModel }))
<<<<<<< HEAD
app.use('/api/movimiento', createMovimientoRouter({ MovimientoModel }))
=======
app.use('/api/noticia', createNoticiaRouter({ NoticiaModel }))
>>>>>>> fd1dad8388555bc0f1bd42925348a30467605051

const PORT = 1234 ?? process.env.PORT
app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
