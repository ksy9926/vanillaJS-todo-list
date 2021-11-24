import { makeElement } from "../utils/Element.js";

export default class Component {
  $target;
  $props;
  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}
  mounted() {}
  template() {}

  todoRender() {
    const child = this.template();

    const target = document.querySelector("main");
    const div = makeElement("div", "", "todos");

    if (target.childNodes.length) {
      target.childNodes[2].remove();
    }

    div.appendChild(child);
    target.appendChild(div);

    this.todoMounted();
  }

  render() {
    const child = this.template();

    if (this.$target.childNodes.length) {
      this.$target.childNodes[0].remove();
    }

    this.$target.appendChild(child);
    this.mounted();
  }

  setEvent() {}

  setState(newState, flag) {
    this.$state = { ...this.state, ...newState };
    if (flag !== "N") localStorage.setItem("state", JSON.stringify(this.$state));
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    // selector에 명시한 것보다 더 하위 요소가 선택되는 경우가 있을 땐 closest를 이용하여 처리한다.
    // closest() 메소드는 자신부터 부모 요소 단위로 출발하여 각 요소가 지정한 선택자에 만족할 때까지 탐색한다.
    // 이 중 가장 가깝게 조건에 만족한 부모 요소가 반환되며, 조건에 만족한 요소가 없으면 null 값을 반환한다.
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
