import Component from "./core/Component.js";
import Search from "./components/Search.js";
import Todos from "./components/Todos.js";
import { PROJECT_TITLE } from "./constants/Constants.js";

export default class App extends Component {
  mounted() {
    // const $search = this.$target.querySelector("#search");
    const $todos = this.$target.querySelector("#todos");

    // new Search($search);
    new Todos($todos);
  }

  template() {
    return `
      <main>
        <h1>${PROJECT_TITLE}</h1>
        <div id="todos"></div>
      </main>
    `;
  }
}
