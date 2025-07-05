import { Task } from './Task'

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public tasks: Task[]
  ) {}
}
