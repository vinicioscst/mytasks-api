import { z } from 'zod/v4'
import { CreateUserRequestDTO } from './CreateUserRequestDTO'

export const UpdateUserRequestDTO = CreateUserRequestDTO.extend({
  avatar: z.string()
}).partial()
export type TUpdateUserRequestDTO = z.infer<typeof UpdateUserRequestDTO>
