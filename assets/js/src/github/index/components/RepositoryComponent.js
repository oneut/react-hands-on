import React from "react";
import SelectedRepositoriesAction from "../actions/SelectedRepositoriesAction";

export default class RepositoryComponent extends React.Component {
  handleSelect() {
    SelectedRepositoriesAction.add(this.props.repository.toJS());
  }

  render() {
    return (
      <li>
        {this.props.repository.full_name}(
        {this.props.repository.stargazers_count})
        <button onClick={this.handleSelect.bind(this)}>Select</button>
      </li>
    );
  }
}
