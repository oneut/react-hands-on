import GitHubIndexDispatcher from "../dispatchers/GitHubIndexDispatcher";
import RepositoriesType from "../types/RepositoriesType";

export default class RepositoriesAction {
  static sync(repositories) {
    GitHubIndexDispatcher.dispatch({
      type: RepositoriesType.sync,
      repositories: repositories
    });
  }
}
