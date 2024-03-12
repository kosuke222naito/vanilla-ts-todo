import Todo from "../todo";

export default class TodoView {
  addTodo = (id: number, todo: Todo): void => {
    const todoLi = document.createElement("li");
    todoLi.id = `todo${id}`;
    todoLi.append(
      this._createCheckBox(),
      this._createLabel(todo.text),
      this._createButton()
    );
    document.querySelector(".todos")!.append(todoLi);
  };

  updateTodo = (id: number, todo: Todo): void => {
    const oldTodoLi: HTMLLIElement | null = document.querySelector(
      `#todo${id}`
    );
    if (!oldTodoLi) {
      return;
    }
    this._updateText(id, todo.text);
    this._toggleCheck(id);
  };

  deleteTodo = (id: number): void => {
    document.querySelector(`#todo${id}`)!.remove();
  };

  _toggleCheck = (id: number): void => {
    const todoLi = document.querySelector(`#todo${id}`)!;
    // document.querySelector(`#todo{id}`)!.querySelector("input[type='checkbox']");
    const checkbox = todoLi.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    todoLi.className = checkbox.checked ? "checked" : "";
  };

  _updateText = (id: number, text: string): void => {
    const todoLiLabel = document
      .querySelector(`#todo${id}`)!
      .querySelector("label") as HTMLLabelElement;
    todoLiLabel.textContent = text;
  };

  _createCheckBox = (): HTMLInputElement => {
    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    return checkbox;
  };

  _createLabel = (text: string): HTMLLabelElement => {
    const label: HTMLLabelElement = document.createElement("label");
    label.textContent = text;
    return label;
  };

  _createButton = (): HTMLButtonElement => {
    const button = document.createElement("button");
    button.innerText = "削除";
    return button;
  };
}
