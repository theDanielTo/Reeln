import React from 'react';

const defaultAdditional = '--Example Rules--\n' +
'Please feel free to change or omit these rules!\n\n' +
'1. Have fun!\n\n' +
'2. Entry Fee: $0\n\n' +
'3. Anglers may not catch fish or weigh in fish that have been caged or confined in an area prior to the tournament.\n\n' +
'4. All fish must be caught during the hours of competition.\n\n' +
'5. Trolling and fly fishing are permitted.\n\n' +
'6. No cast nets allowed, but anglers may use a landing net.\n\n';

export default class TourneyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      tourneyName: '',
      startDate: '',
      endDate: '',
      closed: false,
      maxParticipants: 1,
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
      additionalRules: defaultAdditional
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ userId: this.props.user.userId });
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleRadioChange(e) {
    const name = e.target.name;
    if (e.target.value === 'true') {
      this.setState({ [name]: true });
    } else {
      this.setState({ [name]: false });
    }
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
    const formData = new FormData(e.target);
    this.props.onFormSubmit(formData);
  }

  render() {
    return (
      <form className="create-tourney-form" onSubmit={this.handleSubmit}>
        <label htmlFor="tourneyName">Name of tourney (max of 25 characters)</label>
        <input required type="text" name="tourneyName" id="tourneyName"
          placeholder="Ex// BIIIIG REELN TOURNEY"
          autoComplete="off"
          maxLength={25}
          value={this.state.tourneyName}
          onChange={this.handleInputChange} />

        <div className="form-group">
          <label htmlFor="image">Choose a tourney picture</label>
          <input type="file" name="image" id="image" />
        </div>

        <div className="inline-groups">
          <div className="inline-group">
            <label htmlFor="startDate">Start Date</label>
            <input type="date" name="startDate" id="startDate"
              value={this.state.startDate}
              onChange={this.handleInputChange}
              required />
          </div>
          <div className="inline-group">
            <label htmlFor="endDate">End Date</label>
            <input type="date" name="endDate" id="endDate"
              value={this.state.endDate}
              onChange={this.handleInputChange}
              required />
          </div>
        </div>

        <div className="form-group">
          <label>Type of tourney</label>
          <div className="inline-input">
            <input type="radio" name="closed" id="public"
              value="false"
              checked={!this.state.closed}
              onChange={this.handleRadioChange} />
            <label htmlFor="public">Public<span>(Anyone can join)</span></label>
          </div>
          <div className="inline-input">
            <input type="radio" name="closed" id="closed"
              value="true"
              checked={this.state.closed}
              onChange={this.handleRadioChange} />
            <label htmlFor="closed">
              Closed / Invitational
              <span>(Only those who are invited may participate)</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="maxParticipants">Number of Participants (1-99)</label>
          <input type="number" name="maxParticipants" id="maxParticipants"
            required min={1} max={99}
            value={this.state.maxParticipants}
            onChange={this.handleInputChange} />
        </div>

        <div className="inline-groups">
          <div className="inline-group">
            <label htmlFor="minWeight">Minimum Weight <span>(0 if not applicable)</span></label>
            <input type="number" name="minWeight" id="minWeight" min={0}
              value={this.state.minWeight}
              onChange={this.handleInputChange} />
          </div>
          <div className="inline-group">
            <label htmlFor="maxWeight">Maximum Weight <span>(0 if not applicable)</span></label>
            <input type="number" name="maxWeight" id="maxWeight" min={0}
              value={this.state.maxWeight}
              onChange={this.handleInputChange} />
          </div>
        </div>

        <h4>Point System</h4>

        <div className="inline-input">
          <input type="checkbox" name="heaviestFive" id="heaviestFive"
            value={this.state.heaviestFive}
            checked={this.state.heaviestFive === 'true'}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="heaviestFive">
            Heaviest 5
            <span>Only the heaviest 5 fish will count towards your total points.</span>
          </label>
        </div>

        <div className="inline-input">
          <input type="checkbox" name="perPound" id="perPound"
            value={this.state.perPound}
            checked={this.state.perPound === 'true'}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="perPound">
            Per Pound (1 - 10)
            <span>For each catch submitted, each pound will count towards your score.</span>
          </label>
        </div>
        <input min="1" max="10" step="1" list="tickmarks-1"
          type="range"
          name="pointsPerPound"
          id="pointsPerPound"
          value={this.state.pointsPerPound}
          onChange={this.handleInputChange}
          disabled={this.state.perPound === 'false'} />
        <span className="flex-center">{this.state.pointsPerPound} point(s)</span>

        <h4>BONUS</h4>

        <div className="inline-input">
          <input type="checkbox" name="heaviest" id="heaviest"
            value={this.state.heaviest}
            checked={this.state.heaviest === 'true'}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="heaviest">
            Heaviest (0-100)
            <span>The angler with the heavist fish will gain these bonus points</span>
          </label>
        </div>
        <input min="0" max="100" step="10" list="tickmarks-10"
          type="range"
          name="pointsHeaviest"
          id="pointsHeaviest"
          value={this.state.pointsHeaviest}
          onChange={this.handleInputChange}
          disabled={this.state.heaviest === 'false'} />
        <span className="flex-center">{this.state.pointsHeaviest} point(s)</span>

        <div className="inline-input">
          <input type="checkbox" name="longest" id="longest"
            value={this.state.longest}
            checked={this.state.longest === 'true'}
            onChange={this.handleCheckboxChange} />
          <label htmlFor="longest">
            Longest (0-100)
            <span>The angler with the longest fish will gain these bonus points</span>
          </label>
        </div>
        <input min="0" max="100" step="10" list="tickmarks-10"
          type="range"
          name="pointsLongest"
          id="pointsLongest"
          value={this.state.pointsLongest}
          onChange={this.handleInputChange}
          disabled={this.state.longest === 'false'} />
        <span className="flex-center">{this.state.pointsLongest} point(s)</span>

        <div className="inline-input">
          <input type="checkbox" name="mostCaught" id="mostCaught"
          value={this.state.mostCaught}
          checked={this.state.mostCaught === 'true'}
          onChange={this.handleCheckboxChange} />
          <label htmlFor="mostCaught">
            Most Caught (0-100)
            <span>The angler with the most caught fish will gain these bonus points</span>
          </label>
        </div>
        <input min="0" max="100" step="10" list="tickmarks-10"
          type="range"
          name="pointsMostCaught"
          id="pointsMostCaught"
          value={this.state.pointsMostCaught}
          onChange={this.handleInputChange}
          disabled={this.state.mostCaught === 'false'} />
        <span className="flex-center">{this.state.pointsMostCaught} point(s)</span>

        <div className="form-group">
          <label htmlFor="additionalRules">Additional Rules / Notes</label>
          <textarea name="additionalRules" id="additionalRules" cols="30" rows="10"
            className="additional-rules"
            value={this.state.additionalRules}
            onChange={this.handleInputChange} />
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

        <button type="submit" className="border-none submit-btn">
            Create Tournament
        </button>
        <a href="#tournaments" className="border-none cancel-btn link-no-deco">
          Cancel
        </a>
      </form>
    );
  }
}
