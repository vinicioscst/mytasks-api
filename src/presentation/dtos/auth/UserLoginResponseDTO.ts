import { z } from 'zod/v4'
import { CreateUserRequestDTO } from '../user/CreateUserRequestDTO'

export const UserLoginResponseDTO = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.string()
  }),
  token: z.string()
})

export type TUserLoginResponseDTO = z.infer<typeof UserLoginResponseDTO>
