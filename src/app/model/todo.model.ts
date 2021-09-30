export class TodoItem {
  docId?: string;
  task: string;
  status: string = 'progress';
  constructor(name: string) {
    this.task = name;
    // this.status = status;
  }
}
