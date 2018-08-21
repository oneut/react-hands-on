import GitHubIndexDispatcher from "../dispatchers/GitHubIndexDispatcher";
import SelectedRepositoriesType from "../types/SelectedRepositoriesType";

export default class SelectedRepositoriesAction {
  static add(attributes) {
    return GitHubIndexDispatcher.dispatch({
      type: SelectedRepositoriesType.add,
      attributes: attributes
    });
  }

  static delete(id) {
    return GitHubIndexDispatcher.dispatch({
      type: SelectedRepositoriesType.delete,
      id: id
    });
  }

  static move(targetId, hoverId) {
    return GitHubIndexDispatcher.dispatch({
      type: SelectedRepositoriesType.move,
      targetId: targetId,
      hoverId: hoverId
    });
  }
}
