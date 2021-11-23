import Component from "../core/Component.js";
import { makeElement } from "../utils/Element.js";

export default class Todos extends Component {
  setEvent() {
    const {
      plusButtonHandler,
      okButtonHandler,
      deleteButtonHandler,
      cancelButtonHandler,
      checkIconHandler,
      editIconHandler,
      inputChangeHandler,
      deleteCheckboxHandler,
      allDeleteCheckboxHandler,
    } = this.$props;

    this.addEvent("click", ".plus-button", plusButtonHandler);
    this.addEvent("click", ".ok-button", okButtonHandler);
    this.addEvent("click", ".delete-button", deleteButtonHandler);
    this.addEvent("click", ".cancel-button", cancelButtonHandler);
    this.addEvent("click", ".check", (e) => checkIconHandler(e));
    this.addEvent("click", ".fa-edit", (e) => editIconHandler(e));
    this.addEvent("change", ".todos__input", (e) => inputChangeHandler(e));
    this.addEvent("click", ".todos__checkbox", (e) => deleteCheckboxHandler(e));
    this.addEvent("click", ".todos__select-all", (e) => allDeleteCheckboxHandler(e));
  }

  template() {
    const { state } = this.$props;
    const { todos, addFlag, deleteFlag, allSelect, completeFlag, onProgressFlag } = state;

    const todoLength = todos.filter((item) => item.onProgress).length;

    const todoFilter = [...todos].filter((item) => {
      return (completeFlag && !item.onProgress) || (onProgressFlag && item.onProgress);
    });

    const todoList = makeElement("div");

    todoFilter.forEach((item, idx) => {
      const todosLi = makeElement("li", "todos__li");
      const todosCheckbox = makeElement("input", `todos__checkbox ${!deleteFlag && "hidden-block"}`, idx, null, "checkbox");
      const todosInput = makeElement(
        "input",
        `todos__input ${item.onEdit ? "input-edit" : item.onProgress ? "input-progress" : "input-complete"}`,
        idx
      );
      const todosDate = makeElement("div", "todos__date", "", item.date);
      const todosCheck = makeElement(
        "i",
        `check fas ${item.onProgress ? "fa-check" : "fa-undo-alt"} ${item.offIcon || item.onEdit ? "hidden-block" : ""}`,
        idx
      );
      const todosEdit = makeElement("i", `fas fa-edit ${item.offIcon ? "hidden-block" : ""}`, idx);

      todosLi.key = idx;
      todosCheckbox.checked = item.checked;
      todosInput.disabled = !item.onEdit;
      todosInput.value = item.todo;

      todosLi.appendChild(todosCheckbox);
      todosLi.appendChild(todosInput);
      todosLi.appendChild(todosDate);
      todosLi.appendChild(todosCheck);
      todosLi.appendChild(todosEdit);

      todoList.appendChild(todosLi);
    });

    // makeElement(태그, 클래스명, id, 텍스트, 타입)
    const todosWrap = makeElement("div", "todos-wrap");
    const h3 = makeElement("h3", "", "", `해야할 일 (${todoLength})`);
    const todosUl = makeElement("ul", "todos__ul");
    const todosLiTitle = makeElement("li", "todos__li");
    const allSelectCheckbox = makeElement("input", `todos__select-all ${!deleteFlag && "hidden-block"}`, "", null, "checkbox");
    const todosDiv = makeElement("div", "todos__input", "", "할 일");
    const todosDateTitle = makeElement("div", "todos__date", "", "작성 날짜");
    const todosEnd = makeElement("div", "flex-one", "", "끝");
    const todosEditTitle = makeElement("div", "flex-one", "", "수정");

    const buttonWrap = makeElement("div", "button-wrap");
    const cancelButton = makeElement("button", `cancel-button ${!addFlag && !deleteFlag && "hidden"}`, "", "취소");
    const deleteButton = makeElement("button", `delete-button ${(addFlag || deleteFlag) && "hidden"}`, "", "삭제");
    const plusButton = makeElement("button", `plus-button ${(addFlag || deleteFlag) && "hidden"}`, "", "추가");
    const okButton = makeElement("button", `ok-button ${!addFlag && !deleteFlag && "hidden"}`, "", "완료");

    allSelectCheckbox.checked = allSelect;

    todosLiTitle.appendChild(allSelectCheckbox);
    todosLiTitle.appendChild(todosDiv);
    todosLiTitle.appendChild(todosDateTitle);
    todosLiTitle.appendChild(todosEnd);
    todosLiTitle.appendChild(todosEditTitle);

    todosUl.appendChild(todosLiTitle);
    todosUl.appendChild(todoList);

    buttonWrap.appendChild(cancelButton);
    buttonWrap.appendChild(deleteButton);
    buttonWrap.appendChild(plusButton);
    buttonWrap.appendChild(okButton);

    todosWrap.appendChild(h3);
    todosWrap.appendChild(todosUl);
    todosWrap.appendChild(buttonWrap);

    return todosWrap;
  }
}
