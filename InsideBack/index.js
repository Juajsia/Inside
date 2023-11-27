import express from 'express'
import 'dotenv/config'

// routers
import { createPersonRouter } from './routes/personRouter.js'
import { createEmpleadoRouter } from './routes/empleadoRouter.js'
import { createVehiculoRouter } from './routes/vehiculoRouter.js'
import { createMovimientoRouter } from './routes/movimientoRouter.js'
import { createNoticiaRouter } from './routes/noticiaRouter.js'

// models
import { PersonModel } from './models/personModel.js'
import { EmpleadoModel } from './models/empleadoModel.js'
import { VehiculoModel } from './models/vehiculoModel.js'
import { MovimientoModel } from './models/movimientoModel.js'
import { NoticiaModel } from './models/noticiaModel.js'

const app = express()
app.use(express.json())

app.use('/api/person', createPersonRouter({ PersonModel }))
app.use('/api/empleado', createEmpleadoRouter({ EmpleadoModel }))
app.use('/api/vehiculo', createVehiculoRouter({ VehiculoModel }))
app.use('/api/movimiento', createMovimientoRouter({ MovimientoModel }))
app.use('/api/noticia', createNoticiaRouter({ NoticiaModel }))

const PORT = 1234 ?? process.env.PORT
app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
