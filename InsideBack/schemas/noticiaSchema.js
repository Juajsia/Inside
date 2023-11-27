import z from 'zod'

const noticiaSchema = z.object({
  titulo: z.string(),
  linkImg: z.string().optional(),
  descripcion: z.string(),
  fechaPublicacion: z.string().refine((value) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value), 'Fecha no valida').optional()
})

export function validateNoticia (object) {
  return noticiaSchema.safeParse(object)
}

export function validateParcialNoticia (object) {
  return noticiaSchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
