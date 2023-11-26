import z from 'zod'

const empleadoSchema = z.object({
  cedula: z.number().int().positive(),
  rol: z.string(),
  observaciones: z.string(),
  direccion: z.string()
})

export function validateEmpleado (object) {
  return empleadoSchema.safeParse(object)
}

export function validateParcialEmpleado (object) {
  return empleadoSchema.partial().safeParse(object)
}
