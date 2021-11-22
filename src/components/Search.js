import Component from "../core/Component.js";

export default class Search extends Component {
  template() {
    return `
      <div class="search-wrap">
        <input type="text" class="search">
        <button class="complete">완료</button>
        <button class="on-progress">진행중</button>
      </div>
    `;
  }
}
