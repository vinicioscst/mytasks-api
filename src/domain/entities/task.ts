export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public dueDate: Date,
    public isCompleted: boolean,
    public userId: string
  ) {}
}
