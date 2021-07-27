import React from 'react';
import ReelnBanner from '../components/reeln-banner';

const tabs = [
  {
    title: 'Rules Overview',
    icon: 'fa-book',
    id: 'rules'
  },
  {
    title: 'Recent Catches',
    icon: 'fa-fish',
    id: 'catches'
  },
  {
    title: 'Chat',
    icon: 'fa-comments',
    id: 'chat'
  }
];

export default class Tourney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoName: '',
      tourney: null,
      participants: [],
      tab: 'rules'
    };
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.renderLeaderboard = this.renderLeaderboard.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderRules = this.renderRules.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/tourneys/${this.props.tourneyId}`)
      .then(res => res.json())
      .then(tourney => this.setState({ tourney }));
  }

  handlePhotoChange(e) {
    this.setState({ fileName: e.target.value });
  }

  changePhoto() {
    // e.preventDefault();
    // const formData = new FormData(e.target);
    // fetch('/api/users/upload', {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then(res => res.json())
    //   .then(this.setState({ fileName: e.target.value }))
    //   .catch(err => console.error(err));
  }

  renderLeaderboard() {

  }

  renderTabs() {
    return tabs.map(tab => {
      return (
        <Tab tab={tab}
          key={tab.id}
          onTabClick={this.handleTabClick}
          active={tab.id === this.state.tab} />
      );
    });
  }

  renderRules(tourney) {
    return (
      <>
        <h2 className="text-center">Rules Overview</h2>
        <h2>Duration</h2>
        {tourney.startDate} - { tourney.endDate }
        <h2> Point System</h2>
        <p>Minimum weight: {tourney.minWeight}</p>
        <p>Maximum weight: {tourney.maxWeight}</p>
        <p className={(tourney.heaviestFive) ? '' : 'line-through'}>
          Heaviest Five</p>
        <p className={(tourney.perPound) ? '' : 'line-through'}>
          Per Pound</p>
        { tourney.pointsPerPound } points per pound
        <h3> Bonus</h3>
        <p>
          <span className={(tourney.heaviest) ? '' : 'line-through'}>Heaviest</span>
          : {tourney.pointsHeaviest} points
        </p>
        <p>
          <span className={(tourney.longest) ? '' : 'line-through'}>Longest</span>
          : {tourney.pointsLongest} points
        </p>
        <p>
          <span className={(tourney.mostCaught) ? '' : 'line-through'}>Most Caught</span>
          : {tourney.pointsMostCaught} points
        </p>
        <h2>Additional Rules / Notes</h2>
        { tourney.additionalRules }
      </>
    );
  }

  handleTabClick(e) {
    this.setState({ tab: e.target.closest('.tab').id });
  }

  render() {
    if (!this.state.tourney) return null;
    const { userId, tourneyName } = this.state.tourney;
    const showBtn = (parseInt(userId) === this.props.user.userId)
      ? ' hidden'
      : '';
    return (
      <div className="tourney-page">
        <ReelnBanner />
        <div className={'t-btn-container flex-center' + showBtn}>
          <button className="join-tourney-btn border-none">JOIN</button>
        </div>
        <div className="tourney-header text-center">
          <h1>{tourneyName}</h1>
          <img src="./images/hero-banner.jpg" alt="Tourney Pic" />
          {/* <form onSubmit={this.handlePhotoChange}>
            <label htmlFor="image"
              className="custom-file-upload">
              <i className="fas fa-pen" />
              <span>  {this.state.photoName}</span>
            </label>
            <input required hidden
              type="file" name="image" id="image"
              onChange={this.handleFileChange} />
            <button type="submit">Change Photo</button>
          </form> */}
        </div>

        <div className="leaderboard">
          <h1 className="text-center">Standings</h1>
          {this.renderLeaderboard}
        </div>

        <div className="tourney-details">
          <div className="tabs-container">
            {this.renderTabs()}
          </div>
          <Details
            tourney={this.state.tourney}
            tab={this.state.tab} />
        </div>
      </div>
    );
  }
}

function Tab(props) {
  const tabActive = (props.active)
    ? 'active'
    : '';
  return (
    <div className={'flex-center text-center tab ' + tabActive}
      id={props.tab.id}
      onClick={props.onTabClick} >
      <i className={'fas ' + props.tab.icon} />{props.tab.title}
    </div>
  );
}

function Details(props) {
  const {
    startDate, endDate,
    minWeight, maxWeight,
    heaviestFive,
    perPound, pointsPerPound,
    heaviest, pointsHeaviest,
    longest, pointsLongest,
    mostCaught, pointsMostCaught,
    additionalRules
  } = props.tourney;
  const rules = <>
    <h2 className="text-center">Rules Overview</h2>
    <h2>Duration</h2>
    {startDate} - {endDate}
    <h2>Point System</h2>
    <p>Minimum weight: {minWeight}</p>
    <p>Maximum weight: {maxWeight}</p>
    <p className={(heaviestFive) ? '' : 'line-through'}>
      Heaviest Five</p>
    <p className={(perPound) ? '' : 'line-through'}>
      Per Pound</p>
    {pointsPerPound} points per pound
    <h3>Bonus</h3>
    <p>
      <span className={(heaviest) ? '' : 'line-through'}>Heaviest</span>
      : {pointsHeaviest} points
    </p>
    <p>
      <span className={(longest) ? '' : 'line-through'}>Longest</span>
      : {pointsLongest} points
    </p>
    <p>
      <span className={(mostCaught) ? '' : 'line-through'}>Most Caught</span>
      : {pointsMostCaught} points
    </p>
    <h2>Additional Rules / Notes</h2>
    {additionalRules}
  </>;
  const catches = <>
    &quot;Photos of recent catches&quot;
  </>;
  const chat = <>
    &quot;Chatbox&quot;
  </>;
  let view = rules;
  if (props.tab === 'rules') view = rules;
  else if (props.tab === 'catches') view = catches;
  else view = chat;
  return (
    <div className="detail-view" id={props.id}>
      {view}
    </div>
  );
}
