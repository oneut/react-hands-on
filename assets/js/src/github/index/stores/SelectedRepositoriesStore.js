import { ReduceStore } from "flux/utils";
import Immutable from "immutable";
import GitHubIndexDispatcher from "../dispatchers/GitHubIndexDispatcher";
import SelectedRepositoriesType from "../types/SelectedRepositoriesType";
import Repository from "../models/Repository";

class SelectedRepositoriesStore extends ReduceStore {
  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
    switch (action.type) {
      case SelectedRepositoriesType.add:
        return state.push(new Repository(action.attributes));
      case SelectedRepositoriesType.delete:
        const deleteIndex = state.findIndex((repository) => {
          return repository.id === action.id;
        });
        return state.delete(deleteIndex);
      case SelectedRepositoriesType.move:
        const target = state.find((item) => {
          return item.id === action.targetId;
        });

        const targetIndex = state.findIndex((item) => {
          return item.id === action.targetId;
        });

        const hoverIndex = state.findIndex((item) => {
          return item.id === action.hoverId;
        });

        return state.delete(targetIndex).insert(hoverIndex, target);
      default:
        return state;
    }
  }
}

const selectedRepositoriesStore = new SelectedRepositoriesStore(
  GitHubIndexDispatcher
);
export default selectedRepositoriesStore;
