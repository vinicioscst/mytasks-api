import { z } from 'zod/v4'

export const UpdateUserResponseDTO = z.object({
  id: z.uuid(),
  email: z.string(),
  avatar: z.string()
})

export type TUpdateUserResponseDTO = z.infer<typeof UpdateUserResponseDTO>
