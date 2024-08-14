export class ToDo {
  constructor(
    public id: string = '',
    public title: string = '',
    public description: string = '',
    public done: boolean = false,
    public deadline: Date = new Date()
  ) {
  }
}
