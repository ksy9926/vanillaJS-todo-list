import Component from "../core/Component.js";

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

    // 추가 버튼 클릭 이벤트
    this.addEvent("click", ".plus-button", () => {
      plusButtonHandler();
    });

    // 확인 버튼 클릭 이벤트
    this.addEvent("click", ".ok-button", () => {
      okButtonHandler();
    });

    // 삭제 버튼 클릭 이벤트
    this.addEvent("click", ".delete-button", () => {
      deleteButtonHandler();
    });

    // 취소 버튼 클릭 이벤트
    this.addEvent("click", ".cancel-button", () => {
      cancelButtonHandler();
    });

    // 체크 아이콘 클릭 이벤트
    this.addEvent("click", ".check", (e) => {
      checkIconHandler(e);
    });

    // 편집 아이콘 클릭 이벤트
    this.addEvent("click", ".fa-edit", (e) => {
      editIconHandler(e);
    });

    // todo 인풋 입력시
    this.addEvent("change", ".todos__input", (e) => {
      inputChangeHandler(e);
    });

    // todo 체크박스 클릭 이벤트
    this.addEvent("click", ".todos__checkbox", (e) => {
      deleteCheckboxHandler(e);
    });

    // todo 전체선택 체크박스 클릭 이벤트
    this.addEvent("click", ".todos__select-all", (e) => {
      allDeleteCheckboxHandler(e);
    });
  }

  template() {
    const { state } = this.$props;
    const {
      todos,
      addFlag,
      deleteFlag,
      allSelect,
      completeFlag,
      onProgressFlag,
    } = state;

    const todoLength = todos.filter((item) => item.onProgress).length;

    const todoFilter = [...todos].filter((item) => {
      return (
        (completeFlag && !item.onProgress) ||
        (onProgressFlag && item.onProgress)
      );
    });

    const todoList = todoFilter
      .map((item, idx) => {
        return `
          <li key=${idx} class="todos__li">
            <input id=${idx} ${
          item.checked && "checked"
        } type="checkbox" class="todos__checkbox ${
          !deleteFlag && "hidden-block"
        }" >
            <input id=${idx} ${item.onEdit ? "" : "disabled"} value="${
          item.todo
        }" class="todos__input ${
          item.onEdit
            ? "input-edit"
            : item.onProgress
            ? "input-progress"
            : "input-complete"
        }">
            <div class="todos__date">${item.date}</div>
            <i id=${idx} class="check fas ${
          item.onProgress ? "fa-check" : "fa-undo-alt"
        } ${item.offIcon || item.onEdit ? "hidden-block" : ""}" ></i>
            <i id=${idx} class="fas fa-edit ${
          item.offIcon ? "hidden-block" : ""
        }"></i>
          </li>
        `;
      })
      .join("");

    return `
      <div class="todos-wrap">
        <h3>해야할 일 (${todoLength})</h3>
        <ul class="todos__ul">
          <li class="todos__li">
            <input type="checkbox" ${
              allSelect && "checked"
            } class="todos__select-all ${!deleteFlag && "hidden-block"}">
            <div class="todos__input">할 일</div>
            <div class="todos__date">작성 날짜</div>
            <div class="flex-one">끝</div>
            <div class="flex-one">수정</div>
          </li>
          ${todoList}
        </ul>
        <div class="button-wrap">
          <button class="cancel-button ${
            !addFlag && !deleteFlag && "hidden"
          }">취소</button>
          <button class="delete-button ${
            (addFlag || deleteFlag) && "hidden"
          }">삭제</button>
          <button class="plus-button ${
            (addFlag || deleteFlag) && "hidden"
          }">추가</button>
          <button class="ok-button ${
            !addFlag && !deleteFlag && "hidden"
          }">완료</button>
        </div>
      </div>
    `;
  }
}
