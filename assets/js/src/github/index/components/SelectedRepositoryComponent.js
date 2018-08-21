import React from "react";
import SelectedRepositoriesAction from "../actions/SelectedRepositoriesAction";
import { DragSource, DropTarget } from "react-dnd";

const dndType = Symbol("repository");

const dragSpec = {
  beginDrag(props) {
    return {
      selectedRepository: props.selectedRepository
    };
  }
};

const dropSpec = {
  hover(props, monitor, component) {
    const targetId = monitor.getItem().selectedRepository.id;
    const hoverId = props.selectedRepository.id;

    if (targetId === hoverId) {
      return;
    }

    SelectedRepositoriesAction.move(targetId, hoverId);
  }
};

@DragSource(dndType, dragSpec, (connect) => ({
  connectDragSource: connect.dragSource()
}))
@DropTarget(dndType, dropSpec, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class SelectedRepositoryComponent extends React.Component {
  handleDelete() {
    SelectedRepositoriesAction.delete(this.props.selectedRepository.id);
  }

  render() {
    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <li>
          {this.props.selectedRepository.full_name}(
          {this.props.selectedRepository.stargazers_count})
          <button onClick={this.handleDelete.bind(this)}>Delete</button>
        </li>
      )
    );
  }
}
