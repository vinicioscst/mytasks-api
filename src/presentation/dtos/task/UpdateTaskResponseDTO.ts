import { z } from 'zod/v4'

export const UpdateTaskResponseDTO = z.object({
  id: z.uuid()
})

export type TUpdateTaskResponseDTO = z.infer<typeof UpdateTaskResponseDTO>
