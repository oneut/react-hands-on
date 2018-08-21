import React from "react";
import SelectedRepositoryComponent from "./SelectedRepositoryComponent";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

@DragDropContext(HTML5Backend)
export default class SelectedRepositoriesComponent extends React.Component {
  render() {
    const selectedRepositoryComponents = this.getSelectedRepositoryComponents();

    return (
      <div>
        <h1>Selected Repositories</h1>
        <ul>{selectedRepositoryComponents}</ul>
      </div>
    );
  }

  getSelectedRepositoryComponents() {
    if (this.props.selectedRepositories.isEmpty()) {
      return <li>Nothing.</li>;
    }

    return this.props.selectedRepositories.map((selectedRepository, index) => {
      return (
        <SelectedRepositoryComponent
          key={index}
          selectedRepository={selectedRepository}
        />
      );
    });
  }
}
