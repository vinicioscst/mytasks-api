import { z } from 'zod/v4'

export const CreateTaskRequestDTO = z.object({
  title: z
    .string({ error: 'Título deve ser texto' })
    .nonempty({ error: 'Título é obrigatório' })
    .max(60, { error: 'Título deve conter no máximo 60 caracteres' }),
  description: z
    .string({ error: 'Descrição deve ser texto' })
    .max(255, { error: 'Descrição deve conter no máximo 255 caracteres' })
    .nullable(),
  dueDate: z
    .string({ error: 'Vencimento deve ser uma data' })
    .transform((value) => new Date(value))
    .nonoptional(),
  isCompleted: z
    .boolean({ error: 'Condição deve ser um booleano' })
    .nonoptional()
})

export type TCreateTaskRequestDTO = z.infer<typeof CreateTaskRequestDTO>
