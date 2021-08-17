import React from 'react';
import SubHeader from '../components/sub-header';
import AppContext from '../lib/app-context';
import { getToken } from '../lib';

export default class LogCatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tourney: {},
      fileName: 'Click here to select a photo',
      dateCaught: '',
      weight: 0,
      length: 0,
      score: 0
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { route } = this.context;
    const tourneyId = route.params.get('tourneyId');
    fetch(`/api/tourneys/${tourneyId}`, {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(results => {
        this.setState({ tourney: results });
      });
  }

  handleFileChange(e) {
    this.setState({ fileName: e.target.value });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weight, tourney } = this.state;
    const { route } = this.context;
    const formData = new FormData(e.target);
    const tourneyId = route.params.get('tourneyId');

    fetch(`/api/catches/log/${tourneyId}`, {
      method: 'POST',
      headers: {
        'x-access-token': getToken()
      },
      body: formData
    })
      .then(res => res.json())
      .then(results => {
        fetch('/api/participants/addScore', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': getToken()
          },
          body: JSON.stringify({
            tourneyId: results.tourneyId,
            score: weight * tourney.pointsPerPound
          })
        })
          .then(res => res.json())
          .then(e.target.reset())
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    const tourneyId = this.state.tourney.tourneyId;
    return (
      <div className="log-catch-page">
        <SubHeader text={'Submit a catch for <' + this.state.tourney.tourneyName + '>'} />
        <form className="log-catch-form"
          onSubmit={this.handleSubmit}>

          <div className="inline-groups">
            <div className="inline-group">
              <label htmlFor="image">
                Upload a photo
                <span>(Photos in landscape orientation look better)</span>
              </label>
              <input required type="file" name="image" id="image"
                onChange={this.handleFileChange} />
            </div>
            <div className="inline-group">
              <label htmlFor="dateCaught">Date of catch</label>
              <input type="date" name="dateCaught" id="dateCaught"
                value={this.state.dateCaught}
                onChange={this.handleChange}
                required />
            </div>
          </div>

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

          <button type="submit" className="border-none submit-btn">
            Submit
          </button>
          <a href={`#tournaments?tourneyId=${tourneyId}`} className="border-none cancel-btn link-no-deco">
            Go Back
          </a>
        </form>
      </div>
    );
  }
}

LogCatch.contextType = AppContext;
