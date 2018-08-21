import React from "react";

export default class SaveButton extends React.Component {
  handleSave() {
    console.log(this.props.selectedRepositories.toJS());
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSave.bind(this)}>Save</button>
      </div>
    );
  }
}
