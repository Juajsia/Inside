import z from 'zod'

const vehiculoSchema = z.object({
  placa: z.string(),
  cedula: z.number().int().positive()
})

export function validateVehiculo (object) {
  return vehiculoSchema.safeParse(object)
}

export function validateParcialVehiculo (object) {
  return vehiculoSchema.partial().safeParse(object)
}
