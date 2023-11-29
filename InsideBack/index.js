import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { validateToken } from './middlewares/validateToken.js'
import { validateRolToken } from './middlewares/validateRolToken.js'

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
app.use(cors())
app.use(express.json())

app.use('/api/person', createPersonRouter({ PersonModel }))
app.use('/api/empleado', validateToken, validateRolToken(['Administrador']), createEmpleadoRouter({ EmpleadoModel }))
app.use('/api/vehiculo', validateToken, validateRolToken(['Administrador']), createVehiculoRouter({ VehiculoModel }))
app.use('/api/movimiento', validateToken, validateRolToken(['Administrador', 'Vigilante']), createMovimientoRouter({ MovimientoModel }))
app.use('/api/noticia', validateToken, validateRolToken(['Administrador']), createNoticiaRouter({ NoticiaModel }))

const PORT = 1234 ?? process.env.PORT
app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
