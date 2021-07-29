import React from 'react';
import { calcScore, getToken } from '../lib';

export default class LogCatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTourneys: [],
      dateCaught: '',
      weight: 0,
      length: 0,
      tourneyId: 0,
      score: 0
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertOptions = this.insertOptions.bind(this);
    this.handleTourneySelect = this.handleTourneySelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/tourneys/current', {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(currentTourneys => {
        this.setState({ currentTourneys });
      });
  }

  handleFileChange(e) {
    this.setState({ fileName: e.target.value });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    console.log('comp score:', calcScore(4, 3));
  }

  insertOptions() {
    return this.state.currentTourneys.map(tourney => {
      return (
        <option key={tourney.tourneyId}
          value={tourney.tourneyId}>
          {tourney.tourneyName}
        </option>
      );
    });
  }

  handleTourneySelect(e) {
    this.setState({ tournament: e.target.value });
  }

  handleSubmit(e) {
    // e.preventDefault();
    const formData = new FormData(e.target);

    // fetch('/api/catches/log', {
    //   method: 'POST',
    //   headers: {
    //     'x-access-token': getToken()
    //   },
    //   body: formData
    // })
    //   .then(res => res.json())
    //   .then(results => {
    //     const { tourneyId, weight } = results;

    //     // fetch('/api/participants/addScore', {
    //     //   method: 'PATCH',
    //     //   headers: {
    //     //     'Content-Type': 'application/json',
    //     //     'x-access-token': getToken(),
    //     //     body: JSON.stringify({
    //     //       catchScore: calcScore(parseInt(tourneyId), parseInt(weight)),
    //     //       tourneyId: parseInt(tourneyId)
    //     //     })
    //     //   }
    //     // })
    //     //   .then(res => res.json())
    //     //   .then(e.target.reset())
    //     //   .catch(err => console.error(err));
    //   })
    //   .catch(err => console.error(err));
  }

  render() {
    // console.log('score:', this.state.score);
    return (
      <div className="log-catch-page">
        <form className="log-catch-form"
          onSubmit={this.handleSubmit}>
          <label htmlFor="image">
            Upload a photo of your fish
          </label>
          <input required type="file" name="image" />
          <label htmlFor="dateCaught">Date of catch</label>
          <input type="date" name="dateCaught" id="dateCaught"
            value={this.state.dateCaught}
            onChange={this.handleChange}
            required />
          <div className="inline-groups">
            <div className="inline-group">
              <label htmlFor="weight">Weight (pounds)<span>(Leave blank if not applicable)</span></label>
              <input type="number" name="weight" id="weight" min={0}
                value={this.state.weight}
                onChange={this.handleChange} />
            </div>
            <div className="inline-group">
              <label htmlFor="length">Length (inches)<span>(Leave blank if not applicable)</span></label>
              <input type="number" name="length" id="length" min={0}
                value={this.state.length}
                onChange={this.handleChange} />
            </div>
          </div>
          <label htmlFor="tournament">Tournament</label>
          <select name="tourneyId" id="tourneyId" required
            value={this.state.tourneyId}
            onChange={this.handleChange}>
            <option value={0} disabled>--Select a tournament--</option>
            {/* <option value={0}>--Add to personal album--</option> */}
            {this.insertOptions()}
          </select>
          <button type="submit" className="border-none submit-btn">
            Submit
          </button>
          <a href="#tournaments" className="border-none cancel-btn link-no-deco">
            Cancel
          </a>
        </form>
      </div>
    );
  }
}
