import Component from "../core/Component.js";

export default class Search extends Component {
  setEvent() {
    const { completeButtonHandler, onProgressButtonHandler, searchHandler } =
      this.$props;

    // 완료 필터 버튼 클릭 이벤트
    this.addEvent("click", ".complete", () => {
      completeButtonHandler();
    });

    // 진행중 필터 버튼 클릭 이벤트
    this.addEvent("click", ".on-progress", () => {
      onProgressButtonHandler();
    });

    // 검색 필터 이벤트
    this.addEvent("input", ".search", (e) => {
      searchHandler(e);
    });
  }

  template() {
    const { state } = this.$props;
    const { completeFlag, onProgressFlag } = state;

    return `
      <div class="search-wrap">
        <input type="text" class="search">
        <button class="complete" style="background: ${
          completeFlag ? "#fcff65" : "#d8d8d8"
        }">완료</button>
        <button class="on-progress" style="background: ${
          onProgressFlag ? "#fcff65" : "#d8d8d8"
        }">진행중</button>
      </div>
    `;
  }
}
