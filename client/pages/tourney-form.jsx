import React from 'react';

export default class TourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourneyName: '',
      tourneyImg: '',
      startDate: '',
      endDate: '',
      closed: 'false',
      maxParticipants: 2,
      minWeight: 0,
      maxWeight: 0,
      heaviestFive: 'false',
      perPound: 'false',
      pointsPerPound: 1,
      heaviest: 'false',
      pointsHeaviest: 0,
      longest: 'false',
      pointsLongest: 0,
      mostCaught: 'false',
      pointsMostCaught: 0,
      additionalRules: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleCheckboxChange(e) {
    const name = e.target.name;
    if (e.target.checked) {
      this.setState({ [name]: 'true' });
    } else {
      this.setState({ [name]: 'false' });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    window.location.href = '#tournaments';
    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <form className="create-tourney-form" onSubmit={this.handleSubmit}>
        <label htmlFor="tourneyName">Name of tourney</label>
        <input required type="text" name="tourneyName" id="tourneyName"
          value={this.state.tourneyName}
          onChange={this.handleChange} />

        {/* <div className="form-group">
          <label htmlFor="tourneyImg">Choose a tourney picture</label>
          <input type="file" name="tourneyImg" id="tourneyImg"
            />
        </div> */}

        <div className="inline-groups">
          <div className="inline-group">
            <label htmlFor="startDate">Start Date</label>
            <input type="date" name="startDate" id="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
              required />
          </div>
          <div className="inline-group">
            <label htmlFor="endDate">End Date</label>
            <input type="date" name="endDate" id="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
              required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="type">Type of tourney</label>
          <div className="inline-input">
            <input type="radio" name="closed" id="public"
              value={false}
              onChange={this.handleChange}
              checked={this.state.closed === 'false'} />
            <label htmlFor="public">Public<span>(Anyone can join)</span></label>
          </div>
          <div className="inline-input">
            <input type="radio" name="closed" id="closed"
              value={true}
              onChange={this.handleChange} />
            <label htmlFor="closed">
              Closed / Invitational
              <span>(Only those who are invited may participate)</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="maxParticipants">Number of Participants (2-100)</label>
          <input type="number" name="maxParticipants" id="maxParticipants"
            required min={2} max={100}
            value={this.state.maxParticipants}
            onChange={this.handleChange} />
        </div>

        <div className="inline-groups">
          <div className="inline-group">
            <label htmlFor="minWeight">Minimum Weight <span>(0 if not applicable)</span></label>
            <input type="number" name="minWeight" id="minWeight" min={0}
              value={this.state.minWeight}
              onChange={this.handleChange} />
          </div>
          <div className="inline-group">
            <label htmlFor="maxWeight">Maximum Weight <span>(0 if not applicable)</span></label>
            <input type="number" name="maxWeight" id="maxWeight" min={0}
              value={this.state.maxWeight}
              onChange={this.handleChange} />
          </div>
        </div>

        <h4>Point System</h4>
        <div className="inline-input">
          <input type="checkbox" name="heaviestFive" id="heaviestFive"
            value={this.state.heaviestFive}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="heaviestFive">Heaviest 5</label>
        </div>
        <div className="inline-input">
          <input type="checkbox" name="perPound" id="perPound"
          value={this.state.perPound}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="perPound">Per Pound</label>
        </div>
        <input min="1" max="10" step="1" list="tickmarks-1"
          type="range"
          name="pointsPerPound"
          id="pointsPerPound"
          value={this.state.pointsPerPound}
          onChange={this.handleChange}
          disabled={this.state.perPound === 'false'} />
        <span className="flex-center">{this.state.pointsPerPound} point(s)</span>

        <h4>BONUS</h4>
        <div className="inline-input">
          <input type="checkbox" name="heaviest" id="heaviest"
            value={this.state.heaviest}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="heaviest">Heaviest</label>
        </div>
        <input min="0" max="100" step="10" list="tickmarks-10"
          type="range"
          name="pointsHeaviest"
          id="pointsHeaviest"
          value={this.state.pointsHeaviest}
          onChange={this.handleChange}
          disabled={this.state.heaviest === 'false'} />
        <span className="flex-center">{this.state.pointsHeaviest} point(s)</span>
        <div className="inline-input">
          <input type="checkbox" name="longest" id="longest"
            value={this.state.longest}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="longest">Longest</label>
        </div>
        <input min="0" max="100" step="10" list="tickmarks-10"
          type="range"
          name="pointsLongest"
          id="pointsLongest"
          value={this.state.pointsLongest}
          onChange={this.handleChange}
          disabled={this.state.longest === 'false'} />
        <span className="flex-center">{this.state.pointsLongest} point(s)</span>
        <div className="inline-input">
          <input type="checkbox" name="mostCaught" id="mostCaught"
          value={this.state.mostCaught}
          onChange={this.handleCheckboxChange} />
          <label htmlFor="mostCaught">Most Caught</label>
        </div>
        <input min="0" max="100" step="10" list="tickmarks-10"
          type="range"
          name="pointsMostCaught"
          id="pointsMostCaught"
          value={this.state.pointsMostCaught}
          onChange={this.handleChange}
          disabled={this.state.mostCaught === 'false'} />
        <span className="flex-center">{this.state.pointsMostCaught} point(s)</span>

        <div className="form-group">
          <label htmlFor="additionalRules">Additional Rules / Notes</label>
          <textarea name="additionalRules" id="additionalRules" cols="30" rows="10"
            className="additional-rules"
            value={this.state.additionalRules}
            onChange={this.handleChange} />
        </div>

        <datalist id="tickmarks-1">
          <option value="0"></option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option value="7"></option>
          <option value="8"></option>
          <option value="9"></option>
          <option value="10"></option>
        </datalist>
        <datalist id="tickmarks-10">
          <option value="0"></option>
          <option value="10"></option>
          <option value="20"></option>
          <option value="30"></option>
          <option value="40"></option>
          <option value="50"></option>
          <option value="60"></option>
          <option value="70"></option>
          <option value="80"></option>
          <option value="90"></option>
          <option value="100"></option>
        </datalist>

        <button type="submit" className="border-none submit-tourney-btn">
            Create Tournament
        </button>
        <a href="#tournaments" className="border-none cancel-tourney-btn link-no-deco">
          Cancel
        </a>
      </form>
    );
  }
}
