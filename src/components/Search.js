import Component from "../core/Component.js";
import { debounce } from "../utils/Debounce.js";
import { makeElement } from "../utils/Element.js";

export default class Search extends Component {
  setEvent() {
    const { completeButtonHandler, onProgressButtonHandler, searchHandler } = this.$props;

    // 완료 필터 버튼 클릭 이벤트
    this.addEvent("click", ".complete", completeButtonHandler);

    // 진행중 필터 버튼 클릭 이벤트
    this.addEvent("click", ".on-progress", onProgressButtonHandler);

    // 검색 필터 이벤트
    this.addEvent("input", ".search", (e) => {
      debounce(() => searchHandler(e), 300);
    });
  }

  template() {
    console.log("Search 렌더링");
    const { state } = this.$props;
    const { completeFlag, onProgressFlag } = state;

    const searchWrap = makeElement("div", "search-wrap");
    const searchInput = makeElement("input", "search", "", null, "text");
    const completeButton = makeElement("button", "complete", "", "완료");
    const onProgressButton = makeElement("button", "on-progress", "", "진행중");

    completeButton.style.background = completeFlag ? "#fcff65" : "#d8d8d8";
    onProgressButton.style.background = onProgressFlag ? "#fcff65" : "#d8d8d8";

    searchWrap.appendChild(searchInput);
    searchWrap.appendChild(completeButton);
    searchWrap.appendChild(onProgressButton);

    return searchWrap;
  }
}
