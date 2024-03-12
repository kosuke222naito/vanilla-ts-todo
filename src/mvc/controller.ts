import Todo from "../todo";
import TodosModel from "./model";
import todosView from "./view";

export default class TodoController {
  private nextTodoId: number;
  private todosModel: TodosModel;
  private todosView: todosView;

  constructor() {
    this.nextTodoId = 1;
    this.todosModel = new TodosModel();
    this.todosView = new todosView();
  }

  init = (): void => {
    const $todoForm: HTMLFormElement = document.querySelector(".todo-form")!;
    $todoForm.addEventListener("submit", this.handleSubmitForm);
  };

  handleSubmitForm = (event: SubmitEvent): void => {
    event.preventDefault();
    const inputElement: HTMLInputElement =
      document.querySelector(".todo-input")!;
    const inputValue: string | undefined = inputElement.value;
    if (!inputValue) {
      return;
    }
    const newTodo: Todo = new Todo(inputValue);
    this.todosModel.addTodo(this.nextTodoId, newTodo);
    this.todosView.addTodo(this.nextTodoId, newTodo);

    const $todoLi: HTMLLIElement = document.querySelector(
      `#todo${this.nextTodoId}`
    )!;
    $todoLi
      .querySelector("input[type='checkbox']")
      ?.addEventListener("click", this.handleCheck);
    $todoLi
      .querySelector("button")
      ?.addEventListener("click", this.handleClickDeleteButton);

    this.nextTodoId++;
    inputElement.value = "";
  };

  handleCheck = (event: Event): void => {
    const todoId: number = this._getTodoId(event.target as HTMLElement);
    const oldTodo: Todo | undefined = this.todosModel.getTodo(todoId);
    if (!oldTodo) {
      return;
    }
    const newTodo = new Todo(oldTodo.text, !oldTodo.done);
    this.todosModel.updateTodo(todoId, newTodo);
    this.todosView.updateTodo(todoId, newTodo);
  };

  handleClickDeleteButton = (event: Event): void => {
    const todoId: number = this._getTodoId(event.target as HTMLElement);
    this.todosModel.deleteTodo(todoId);
    this.todosView.deleteTodo(todoId);
  };

  _getTodoId = (element: HTMLElement): number => {
    return parseInt(element.parentElement!.id.replace("todo", ""), 10);
  };
}
