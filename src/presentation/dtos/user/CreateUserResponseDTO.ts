import { z } from 'zod/v4'

export const CreateUserResponseDTO = z.object({
  id: z.uuid()
})

export type TCreateUserResponseDTO = z.infer<typeof CreateUserResponseDTO>
