import { z } from 'zod/v4'

export const UserLoginResponseDTO = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.string()
  }),
  token: z.string()
})

export type TUserLoginResponseDTO = z.infer<typeof UserLoginResponseDTO>
