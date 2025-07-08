import { z } from 'zod/v4'
import { CreateUserRequestDTO } from './CreateUserRequestDTO'

export const UpdateUserRequestDTO = CreateUserRequestDTO.partial()
export type TUpdateUserRequestDTO = z.infer<typeof UpdateUserRequestDTO>
