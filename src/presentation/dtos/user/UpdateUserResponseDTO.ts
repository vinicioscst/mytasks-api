import { z } from 'zod/v4'

export const UpdateUserResponseDTO = z.object({
  id: z.uuid()
})

export type TUpdateUserResponseDTO = z.infer<typeof UpdateUserResponseDTO>
