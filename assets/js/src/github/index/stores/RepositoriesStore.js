import { ReduceStore } from "flux/utils";
import Immutable from "immutable";
import GitHubIndexDispatcher from "../dispatchers/GitHubIndexDispatcher";
import RepositoriesType from "../types/RepositoriesType";
import Repository from "../models/Repository";

class RepositoriesStore extends ReduceStore {
  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
    switch (action.type) {
      case RepositoriesType.sync:
        return Immutable.List().withMutations((state) => {
          action.repositories.forEach((repository) => {
            state.push(new Repository(repository));
          });
        });
      default:
        return state;
    }
  }
}

const repositoriesStore = new RepositoriesStore(GitHubIndexDispatcher);
export default repositoriesStore;
