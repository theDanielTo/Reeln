import React from 'react';
import ReelnBanner from '../components/reeln-banner';
import { getToken } from '../lib';

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
      fileName: 'No File Selected',
      modalActive: false,
      photoName: '',
      tourney: {},
      host: {},
      participants: [],
      tab: 'rules'
    };
    this.handleJoinBtnClick = this.handleJoinBtnClick.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.renderLeaderboard = this.renderLeaderboard.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/tourneys/${this.props.tourneyId}`, {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(tourney => {
        this.setState({ tourney });
        fetch(`/api/users/${tourney.userId}`, {
          headers: {
            'x-access-token': getToken()
          }
        })
          .then(res => res.json())
          .then(result => {
            this.setState({ host: result });
          });
      });

    fetch(`/api/participants/${this.props.tourneyId}`, {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(participants => this.setState({ participants }));
  }

  handleJoinBtnClick() {
    this.setState({ modalActive: true });
  }

  handleModalClick(e) {
    if (e.target.id === 'modal-yes') {
      fetch(`/api/tourneys/join/${this.props.tourneyId}`, {
        method: 'POST',
        headers: {
          'x-access-token': getToken()
        }
      })
        .then(res => res.json())
        .then(this.setState({ modalActive: false }));
    } else if (e.target.id === 'modal-cancel') {
      this.setState({ modalActive: false });
    }
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

  handleTabClick(e) {
    this.setState({ tab: e.target.closest('.tab').id });
  }

  render() {
    if (!this.state.tourney) return null;
    const { tourneyName, maxParticipants, tourneyImg } = this.state.tourney;
    const id = this.state.participants.find(participant => {
      return participant.userId === this.props.user.userId;
    });
    const showBtn = (id !== undefined || this.state.participants.length >= maxParticipants)
      ? ' hidden'
      : '';
    return (
      <div className="tourney-page">
        <Modal hidden={this.state.modalActive}
          onBtnClick={this.handleModalClick} />
        <ReelnBanner />
        <div className={'t-btn-container flex-center' + showBtn}>
          <button className="join-tourney-btn border-none"
            onClick={this.handleJoinBtnClick}>
            JOIN
          </button>
        </div>
        <div className="tourney-header text-center">
          <h1>{tourneyName}</h1>
          <img src={'./images/' + tourneyImg} alt="Tourney Pic" />
        </div>

        <div className="leaderboard">
          <h1 className="text-center">Standings</h1>
          {this.renderLeaderboard()}
        </div>

        <div className="tourney-details">
          <div className="tabs-container">
            {this.renderTabs()}
          </div>
          <Details
            tourney={this.state.tourney}
            tab={this.state.tab}
            host={this.state.host} />
        </div>
      </div>
    );
  }
}

function Modal(props) {
  const modalVis = (props.hidden)
    ? ''
    : 'hidden';
  return (
    <div className={'modal-bg flex-center ' + modalVis}>
      <div className="modal-box hidden">
        <h2>Are you sure?</h2>
        <div className="modal-btns">
          <button id="modal-yes" className="modal-btn"
            onClick={props.onBtnClick}>
            Yes
          </button>
          <button id="modal-cancel" className="modal-btn"
            onClick={props.onBtnClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
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
  const {
    firstName, lastName, username
  } = props.host;
  const rules = <>
    <h2 className="text-center">Rules Overview</h2>
    <p className="text-center">{startDate} - {endDate}</p>
    <p className="text-center">Hosted by: {username} ({firstName} {lastName})</p>

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
