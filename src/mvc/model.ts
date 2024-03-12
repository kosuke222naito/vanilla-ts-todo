import Todo from "../todo";

export default class TodosModel {
  private todos: Map<number, Todo>;

  constructor() {
    this.todos = new Map();
  }

  addTodo = (id: number, todo: Todo): void => {
    this.todos.set(id, todo);
  };

  getTodo = (id: number): Todo | undefined => {
    return this.todos.get(id);
  };

  updateTodo = (id: number, newTodo: Todo): void => {
    const oldTodo: Todo | undefined = this.getTodo(id);
    if (!oldTodo) {
      return;
    }
    this.todos.set(id, newTodo);
  };

  deleteTodo = (id: number): void => {
    this.todos.delete(id);
  };
}
