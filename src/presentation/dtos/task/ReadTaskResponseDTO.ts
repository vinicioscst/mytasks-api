import { z } from 'zod/v4'

export const ReadTaskResponseDTO = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.date(),
  isCompleted: z.boolean()
})

export const ReadAllTasksResponseDTO = z.array(ReadTaskResponseDTO)
