import type { z } from 'zod/v4'
import { CreateTaskRequestDTO } from './CreateTaskRequestDTO'

export const UpdateTaskRequestDTO = CreateTaskRequestDTO.partial()
export type TUpdateTaskRequestDTO = z.infer<typeof UpdateTaskRequestDTO>
