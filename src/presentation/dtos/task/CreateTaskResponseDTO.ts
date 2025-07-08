import { z } from 'zod/v4'

export const CreateTaskResponseDTO = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.date(),
  isCompleted: z.boolean()
})

export type TCreateTaskResponseDTO = z.infer<typeof CreateTaskResponseDTO>
