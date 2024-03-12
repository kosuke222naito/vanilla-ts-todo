export default class Todo {
  text: string;
  done: boolean;

  constructor(text: string, done: boolean = false) {
    this.text = text;
    this.done = done;
  }
}
