import React from 'react';

export default class TourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {

  }

  render() {
    return (
      <form className="create-tourney-form" onSubmit={this.handleSubmit}>

      </form>
    );
  }
}
