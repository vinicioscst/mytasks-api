import { z } from 'zod/v4'

export const UserLoginRequestDTO = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty()
})

export type TUserLoginRequestDTO = z.infer<typeof UserLoginRequestDTO>
