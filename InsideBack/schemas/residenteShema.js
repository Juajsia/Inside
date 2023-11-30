import z from 'zod'

const residenteSchema = z.object({
  cedula: z.number().int().positive(),
  apartamento: z.string(),
  torre: z.string()
})

export function validateResidente (object) {
  return residenteSchema.safeParse(object)
}

export function validateParcialResidente (object) {
  return residenteSchema.partial().safeParse(object)
}
