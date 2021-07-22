import React from 'react';

export default class TourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourneyName: '',
      tourneyImg: '',
      startDate: '',
      endDate: '',
      public: undefined,
      heaviestFive: undefined,
      perPound: undefined,
      pointsPerPound: 10,
      heaviest: undefined,
      pointsHeaviest: 0,
      longest: undefined,
      pointsLongest: 0,
      mostCaught: undefined,
      pointsMostCaught: 0,
      additionalRules: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="create-tourney-form" onSubmit={this.handleSubmit}>
        <label htmlFor="tourney-name">Name of tourney</label>
        <input type="text" name="tourney-name" id="tourney-name" value="" />

        <div className="input-group">
          <label htmlFor="tourney-picture">Choose a tourney picture</label>
          <input type="file" name="tourney-pictture" id="tourney-picture" />
        </div>

        <div className="inline-inputs">
          <div className="inline-input">
            <label htmlFor="start-date">Start Date</label>
            <input type="date" name="start-date" id="start-date" />
          </div>
          <div className="inline-input">
            <label htmlFor="end-date">End Date</label>
            <input type="date" name="end-date" id="end-date" />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="tourney-type">Type of tourney</label>
          <div>
            <input type="radio" name="tourney-type" id="public" value={true} />
            <label htmlFor="public">Public</label>
          </div>
          <div>
            <input type="radio" name="tourney-type" id="closed" value={false} />
            <label htmlFor="closed">Closed / Invitational</label>
          </div>
        </div>

        <div className="inline-inputs">
          <div className="inline-input">
            <label htmlFor="min-weight">Minimum Weight</label>
            <input type="number" name="min-weight" id="min-weight" />
          </div>
          <div className="inline-input">
            <label htmlFor="max-weight">Maximum Weight</label>
            <input type="number" name="max-weight" id="max-weight" />
          </div>
        </div>

        <h4>Point System</h4>
        <div>
          <input type="checkbox" name="heaviest-five" id="heaviest-five" value={true} />
          <label htmlFor="heaviest-five">Heaviest 5</label>
        </div>
        <div>
          <input type="checkbox" name="per-pound-check" id="per-pound-check" value={true} />
          <label htmlFor="per-pound-check">Per Pound (10-100)</label>
        </div>
        <input type="range" name="point-system" id="per-pound" min="10" max="100" step="10"/>

        <h4>BONUS</h4>
        <div>
          <input type="checkbox" name="bonus" id="heaviest" />
          <label htmlFor="heaviest">Heaviest</label>
        </div>
        <input type="range" name="bonus" id="heaviest" min="10" max="100" step="10" />
        <div>
          <input type="checkbox" name="bonus" id="longest" value="Longest" />
          <label htmlFor="heaviest">Longest</label>
        </div>
        <input type="range" name="bonus" id="longest" min="10" max="100" step="10" />
        <div>
          <input type="checkbox" name="bonus" id="most-caught" value="Most Caught" />
          <label htmlFor="heaviest">Most Caught</label>
        </div>
        <input type="range" name="bonus" id="most-caughtt" min="10" max="100" step="10" />

        <div className="input-group">
          <label htmlFor="additional">Additional Rules / Notes</label>
          <textarea name="additional" id="additional" cols="30" rows="10"></textarea>
        </div>

        <button type="submit" className="border-none submit-tourney-btn">
          Create Tournament
        </button>
        <button className="border-none cancel-tourney-btn">
          Cancel
        </button>
      </form>
    );
  }
}
