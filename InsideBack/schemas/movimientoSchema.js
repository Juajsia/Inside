import z from 'zod'

const movimientoSchema = z.object({
  cedulaPersona: z.number().int().positive(),
  fecha: z.string().refine((value) => /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(value), 'Fecha no valida').optional(),
  porteria: z.string(),
  tipo: z.string().refine((value) => /^[sSeE]/.test(value), 'Tipo Entrada no valida'),
  placa: z.string().nullable()
})

export function ValidateMovimiento (object) {
  return movimientoSchema.safeParse(object)
}

export function ValidateParcialMovimiento (object) {
  return movimientoSchema.partial().safeParse(object)
}
