import Component from "./core/Component.js";
import Search from "./components/Search.js";
import Todos from "./components/Todos.js";

import { getFormatDate } from "./utils/Date.js";
import { makeElement } from "./utils/Element.js";

import { PROJECT_TITLE } from "./constants/Constants.js";

export default class App extends Component {
  setup() {
    const storage = JSON.parse(localStorage.getItem("state"));

    if (storage !== null) {
      this.$state = { ...storage, search: "" };
    } else {
      this.$state = {
        todos: [],
        addFlag: false,
        deleteFlag: false,
        allSelect: false,
        completeFlag: true,
        onProgressFlag: true,
        search: "",
      };
    }
  }

  todoMounted() {
    const $todos = this.$target.querySelector("#todos");
    const { state } = this;

    new Todos($todos, {
      plusButtonHandler: this.plusButtonHandler.bind(this),
      okButtonHandler: this.okButtonHandler.bind(this),
      deleteButtonHandler: this.deleteButtonHandler.bind(this),
      cancelButtonHandler: this.cancelButtonHandler.bind(this),
      checkIconHandler: this.checkIconHandler.bind(this),
      editIconHandler: this.editIconHandler.bind(this),
      inputChangeHandler: this.inputChangeHandler.bind(this),
      deleteCheckboxHandler: this.deleteCheckboxHandler.bind(this),
      allDeleteCheckboxHandler: this.allDeleteCheckboxHandler.bind(this),
      state,
    });
  }

  // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
  mounted() {
    const $todos = this.$target.querySelector("#todos");
    const $search = this.$target.querySelector("#search");
    const { state } = this;

    // 하나의 객체에서 사용하는 메소드를 넘겨주기 위해 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { inputChangeHandler: e => inputChangeHandler(e) }
    new Search($search, {
      completeButtonHandler: this.completeButtonHandler.bind(this),
      onProgressButtonHandler: this.onProgressButtonHandler.bind(this),
      searchHandler: this.searchHandler.bind(this),
      state,
    });

    new Todos($todos, {
      plusButtonHandler: this.plusButtonHandler.bind(this),
      okButtonHandler: this.okButtonHandler.bind(this),
      deleteButtonHandler: this.deleteButtonHandler.bind(this),
      cancelButtonHandler: this.cancelButtonHandler.bind(this),
      checkIconHandler: this.checkIconHandler.bind(this),
      editIconHandler: this.editIconHandler.bind(this),
      inputChangeHandler: this.inputChangeHandler.bind(this),
      deleteCheckboxHandler: this.deleteCheckboxHandler.bind(this),
      allDeleteCheckboxHandler: this.allDeleteCheckboxHandler.bind(this),
      state,
    });
  }

  get state() {
    return this.$state;
  }

  // 추가 버튼 클릭 이벤트
  plusButtonHandler() {
    this.setState(
      {
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
        search: "",
      },
      "N"
    );

    this.todoRender();
  }

  // 확인 버튼 클릭 이벤트
  okButtonHandler() {
    const todos = [...this.$state.todos];

    if (this.$state.addFlag) {
      todos[todos.length - 1] = {
        ...todos[todos.length - 1],
        offIcon: false,
        onProgress: true,
        onEdit: false,
        date: getFormatDate(new Date()),
      };

      this.setState({
        ...this.$state,
        addFlag: false,
        todos: todos,
      });
    } else if (this.$state.deleteFlag) {
      this.setState({
        ...this.$state,
        deleteFlag: false,
        todos: todos.filter((item) => !item.checked),
      });
    }

    this.todoRender();
  }

  // 삭제 버튼 클릭 이벤트
  deleteButtonHandler() {
    this.setState({ ...this.$state, addFlag: false, deleteFlag: true }, "N");

    this.todoRender();
  }

  // 취소 버튼 클릭 이벤트
  cancelButtonHandler() {
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

    this.todoRender();
  }

  // 체크 아이콘 클릭 이벤트
  checkIconHandler(e) {
    const idx = e.target.id;
    const todos = [...this.$state.todos];

    todos[idx].onProgress = !todos[idx].onProgress;

    this.setState({
      ...this.$state,
      todos: todos,
    });

    this.todoRender();
  }

  // 편집 아이콘 클릭 이벤트
  editIconHandler(e) {
    const idx = e.target.id;
    const todos = [...this.$state.todos];

    todos[idx].onEdit = !todos[idx].onEdit;
    todos[idx].onProgress = !todos[idx].onProgress;

    this.setState({
      ...this.$state,
      todos: todos,
    });

    this.todoRender();
  }

  // todo 인풋 입력시
  inputChangeHandler(e) {
    const idx = e.target.id;
    const todos = [...this.$state.todos];
    todos[idx].todo = e.target.value;

    this.setState({
      ...this.$state,
      todos: todos,
    });

    this.render();
  }

  // todo 체크박스 클릭 이벤트
  deleteCheckboxHandler(e) {
    const idx = e.target.id;
    const todos = [...this.$state.todos];
    todos[idx].checked = e.target.checked;
    this.setState(
      {
        ...this.$state,
        todos: todos,
      },
      "N"
    );

    this.todoRender();
  }

  // todo 전체선택 체크박스 클릭 이벤트
  allDeleteCheckboxHandler(e) {
    const todos = [...this.$state.todos];
    todos.forEach((item) => (item.checked = this.$state.allSelect ? false : true));
    this.setState(
      {
        ...this.$state,
        todos: todos,
        allSelect: !this.$state.allSelect,
      },
      "N"
    );

    this.todoRender();
  }

  // 완료 필터 버튼 클릭 이벤트
  completeButtonHandler() {
    this.setState({
      ...this.$state,
      completeFlag: !this.$state.completeFlag,
    });

    this.render();
  }

  // 진행중 필터 버튼 클릭 이벤트
  onProgressButtonHandler() {
    this.setState({
      ...this.$state,
      onProgressFlag: !this.$state.onProgressFlag,
    });

    this.render();
  }

  // 검색 필터 이벤트
  searchHandler(e) {
    this.setState({
      ...this.$state,
      search: e.target.value,
    });

    this.todoRender();
  }

  template() {
    const main = makeElement("main");
    const h1 = makeElement("h1", "", "", PROJECT_TITLE);
    const search = makeElement("div", "", "search");
    const todos = makeElement("div", "", "todos");

    main.appendChild(h1);
    main.appendChild(search);
    main.appendChild(todos);

    return main;
  }
}
