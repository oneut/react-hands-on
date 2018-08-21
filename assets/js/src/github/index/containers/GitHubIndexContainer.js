import React from "react";
import { Container } from "flux/utils";
import RepositoriesStore from "../stores/RepositoriesStore";
import SelectedRepositoriesStore from "../stores/SelectedRepositoriesStore";
import RepositoriesComponent from "../components/RepositoriesComponent";
import SelectedRepositoriesComponent from "../components/SelectedRepositoriesComponent";
import SaveButton from "../components/SaveComponent";

class GitHubIndexContainer extends React.Component {
  static getStores() {
    return [RepositoriesStore, SelectedRepositoriesStore];
  }

  static calculateState() {
    return {
      repositories: RepositoriesStore.getState(),
      selectedRepositories: SelectedRepositoriesStore.getState()
    };
  }

  render() {
    return (
      <div>
        <RepositoriesComponent
          repositories={this.state.repositories}
          selectedRepositories={this.state.selectedRepositories}
        />
        <SelectedRepositoriesComponent
          selectedRepositories={this.state.selectedRepositories}
        />
        <SaveButton selectedRepositories={this.state.selectedRepositories} />
      </div>
    );
  }
}

const gitHubIndexContainer = Container.create(GitHubIndexContainer);
export default gitHubIndexContainer;
