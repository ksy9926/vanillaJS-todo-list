import Component from "../core/Component.js";
import { getFormatDate } from "../utils/Date.js";

export default class Todos extends Component {
  setup() {
    const storage = JSON.parse(localStorage.getItem("state"));
    const todoStorage = storage.todos;
    const completeFlagStorage = storage.completeFlag;
    const onProgressFlagStorage = storage.onProgressFlag;

    const todos = todoStorage === null ? [] : todoStorage;
    const completeFlag =
      completeFlagStorage === null ? true : completeFlagStorage;
    const onProgressFlag =
      onProgressFlagStorage === null ? true : onProgressFlagStorage;

    console.log("storage", storage);

    this.$state = {
      todos: todos,
      addFlag: false,
      deleteFlag: false,
      allSelect: false,
      completeFlag: completeFlag,
      onProgressFlag: onProgressFlag,
      search: "",
    };
  }

  setEvent() {
    // 추가 버튼 클릭 이벤트
    this.addEvent("click", ".plus-button", () => {
      this.setState({
        ...this.$state,
        todos: [
          ...this.$state.todos,
          {
            todo: "",
            offIcon: true,
            onProgress: false,
            onEdit: true,
            date: "",
            checked: false,
          },
        ],
        addFlag: true,
        deleteFlag: false,
      });
    });

    // 확인 버튼 클릭 이벤트
    this.addEvent("click", ".ok-button", () => {
      const todos = [...this.$state.todos];

      if (this.$state.addFlag) {
        todos[todos.length - 1] = {
          ...todos[todos.length - 1],
          offIcon: false,
          onProgress: true,
          onEdit: false,
          date: getFormatDate(new Date()),
        };

        localStorage.setItem("todos", JSON.stringify(todos));

        this.setState({
          ...this.$state,
          addFlag: false,
          todos: todos,
        });
      } else if (this.$state.deleteFlag) {
        localStorage.setItem(
          "todos",
          JSON.stringify(todos.filter((item) => !item.checked))
        );

        this.setState({
          ...this.$state,
          deleteFlag: false,
          todos: todos.filter((item) => !item.checked),
        });
      }
    });

    // 삭제 버튼 클릭 이벤트
    this.addEvent("click", ".delete-button", () => {
      this.setState({
        ...this.$state,
        addFlag: false,
        deleteFlag: true,
      });
    });

    // 취소 버튼 클릭 이벤트
    this.addEvent("click", ".cancel-button", () => {
      if (this.$state.addFlag) {
        this.setState({
          ...this.$state,
          todos: [...this.$state.todos.slice(0, this.$state.todos.length - 1)],
          addFlag: false,
          deleteFlag: false,
        });
      } else if (this.$state.deleteFlag) {
        const todos = [...this.$state.todos];

        todos.forEach((item) => (item.checked = false));

        this.setState({
          ...this.$state,
          todos: todos,
          addFlag: false,
          deleteFlag: false,
          allSelect: false,
        });
      }
    });

    // 체크 아이콘 클릭 이벤트
    this.addEvent("click", ".check", (e) => {
      const idx = e.target.id;
      const todos = [...this.$state.todos];

      todos[idx].onProgress = !todos[idx].onProgress;

      localStorage.setItem("todos", JSON.stringify(todos));

      this.setState({
        ...this.$state,
        todos: todos,
      });
    });

    // // 되돌리기 아이콘 클릭 이벤트
    // this.addEvent("click", ".undo-alt", (e) => {
    //   const idx = e.target.id;
    //   const todos = [...this.$state.todos];

    //   todos[idx].onProgress = true;

    //   localStorage.setItem("todos", JSON.stringify(todos));

    //   this.setState({
    //     ...this.$state,
    //     todos: todos,
    //   });
    // });

    // 편집 아이콘 클릭 이벤트
    this.addEvent("click", ".fa-edit", (e) => {
      const idx = e.target.id;
      const todos = [...this.$state.todos];

      todos[idx].onEdit = !todos[idx].onEdit;
      todos[idx].onProgress = !todos[idx].onProgress;

      localStorage.setItem("todos", JSON.stringify(todos));

      this.setState({
        ...this.$state,
        todos: todos,
      });
    });

    // todo 인풋 입력시
    this.addEvent("change", ".todos__input", (e) => {
      const idx = e.target.id;
      const todos = [...this.$state.todos];

      todos[idx].todo = e.target.value;

      localStorage.setItem("todos", JSON.stringify(todos));

      this.setState({
        ...this.$state,
        todos: todos,
      });
    });

    // todo 체크박스 클릭 이벤트
    this.addEvent("click", ".todos__checkbox", (e) => {
      const idx = e.target.id;
      const todos = [...this.$state.todos];

      todos[idx].checked = e.target.checked;

      this.setState({
        ...this.$state,
        todos: todos,
      });
    });

    // todo 전체선택 체크박스 클릭 이벤트
    this.addEvent("click", ".todos__select-all", (e) => {
      const todos = [...this.$state.todos];

      todos.forEach(
        (item) => (item.checked = this.$state.allSelect ? false : true)
      );

      this.setState({
        ...this.$state,
        todos: todos,
        allSelect: !this.$state.allSelect,
      });
    });

    // 완료 필터 버튼 클릭 이벤트
    this.addEvent("click", ".complete", () => {
      localStorage.setItem(
        "completeFlag",
        JSON.stringify(!this.$state.completeFlag)
      );

      this.setState({
        ...this.$state,
        completeFlag: !this.$state.completeFlag,
      });
    });

    // 진행중 필터 버튼 클릭 이벤트
    this.addEvent("click", ".on-progress", () => {
      localStorage.setItem(
        "onProgressFlag",
        JSON.stringify(!this.$state.onProgressFlag)
      );

      this.setState({
        ...this.$state,
        onProgressFlag: !this.$state.onProgressFlag,
      });
    });

    // 검색 필터 이벤트
    this.addEvent("change", ".search", (e) => {
      const len = e.target.value.length;

      console.log(e.target.value, len);

      // this.setState({
      //   ...this.$state,
      //   search: e.target.value,
      // });

      document.querySelector(".search").focus();
      document.querySelector(".search").setSelectionRange(len, len);
    });
  }

  template() {
    const {
      todos,
      addFlag,
      deleteFlag,
      allSelect,
      completeFlag,
      onProgressFlag,
      search,
    } = this.$state;
    const todoLength = todos.filter((item) => item.onProgress).length;

    const todoFilter = [...todos]
      .filter((item) => item.todo.includes(search))
      .filter((item) => {
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
        }"  >
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
      <div class="search-wrap">
        <input value="${search}" type="text" class="search">
        <button class="complete" style="background: ${
          completeFlag ? "#fcff65" : "#d8d8d8"
        }">완료</button>
        <button class="on-progress" style="background: ${
          onProgressFlag ? "#fcff65" : "#d8d8d8"
        }">진행중</button>
      </div>
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
