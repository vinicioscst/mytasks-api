import { z } from 'zod/v4'

export const UpdateUserResponseDTO = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.string(),
    avatar: z.string()
  }),
  accessToken: z.jwt().optional()
})

export type TUpdateUserResponseDTO = z.infer<typeof UpdateUserResponseDTO>
