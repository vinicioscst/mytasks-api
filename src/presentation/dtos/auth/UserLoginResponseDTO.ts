import { z } from 'zod/v4'
import { CreateTaskResponseDTO } from '../task/CreateTaskResponseDTO'

export const UserLoginResponseDTO = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
    tasks: z.array(CreateTaskResponseDTO)
  }),
  accessToken: z.jwt(),
  refreshToken: z.jwt()
})

export type TUserLoginResponseDTO = z.infer<typeof UserLoginResponseDTO>
