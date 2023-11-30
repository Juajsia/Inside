import z from 'zod'

const personSchema = z.object({
  cedula: z.number().int().positive(),
  correo: z.string(),
  contrasenia: z.string(),
  primerNombre: z.string(),
  segundoNombre: z.string().nullable(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
  telefono: z.string(),
  rol: z.string()
})

export function validatePerson (object) {
  return personSchema.safeParse(object)
}

export function validateParcialPerson (object) {
  return personSchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
