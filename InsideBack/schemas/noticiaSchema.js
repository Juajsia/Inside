import z from 'zod'

const noticiaSchema = z.object({
  titulo: z.string(),
  linkImg: z.string().optional(),
  descripcion: z.string()
})

export function validateNoticia (object) {
  return noticiaSchema.safeParse(object)
}

export function validateParcialNoticia (object) {
  return noticiaSchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
