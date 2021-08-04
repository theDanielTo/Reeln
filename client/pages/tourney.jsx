import React from 'react';
import ReelnBanner from '../components/reeln-banner';
import RulesOverview from '../components/rules-overview';
import RecentCatches from '../components/recent-catches';
import ScoreCard from '../components/ScoreCard';
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
      recentCatches: [],
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
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    fetch(`/api/participants/${this.props.tourneyId}`, {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(participants => this.setState({ participants }))
      .catch(err => console.error(err));

    fetch(`/api/catches/${this.props.tourneyId}`, {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(recentCatches => this.setState({ recentCatches }))
      .catch(err => console.error(err));
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
        .then(result => {
          this.setState({ modalActive: false });
          window.location.reload(true);
        });
    } else if (e.target.id === 'modal-cancel') {
      this.setState({ modalActive: false });
    }
  }

  renderLeaderboard(participants) {
    const leaderboard = [];
    for (let i = 0; i < participants.length; i++) {
      leaderboard.push(
        <ScoreCard key={i} place={i + 1}
          score={participants[i].score}
          firstName={participants[i].firstName}
          lastName={participants[i].lastName}
          src={participants[i].avatar} />
      );
    }
    return leaderboard;
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
    const { tourneyId, tourneyName, maxParticipants, tourneyImg } = this.state.tourney;
    const { participants } = this.state;
    const id = participants.find(participant => {
      return participant.userId === this.props.user.userId;
    });
    const showJoinBtn = (id || this.state.participants.length >= maxParticipants)
      ? ' hidden'
      : '';
    const showLogBtn = !id ? ' hidden' : '';
    return (
      <div className="tourney-page">
        <Modal hidden={this.state.modalActive}
          onBtnClick={this.handleModalClick} />
        <ReelnBanner />
        <div className={'t-btn-container flex-center'}>
          <a href={`#logcatch?tourneyId=${tourneyId}`}
            className={'join-tourney-btn border-none link-no-deco' + showLogBtn}
            onClick={this.handleJoinBtnClick}>
            LOG CATCH
          </a>
          <button className={'join-tourney-btn border-none' + showJoinBtn}
            onClick={this.handleJoinBtnClick}>
            JOIN
          </button>
        </div>
        <div className="tourney-header text-center">
          <h2>{tourneyName}</h2>
          <img src={'./images/' + tourneyImg} alt="Tourney Pic" />
        </div>

        <div className="leaderboard">
          <h1 className="text-center">Standings</h1>
          {this.renderLeaderboard(this.state.participants)}
        </div>

        <div className="tourney-details">
          <div className="tabs-container">
            {this.renderTabs()}
          </div>
          <Details
            tab={this.state.tab}
            tourney={this.state.tourney}
            host={this.state.host}
            recentCatches={this.state.recentCatches} />
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
  const rules = <RulesOverview tourney={props.tourney} host={props.host} />;
  const catches = <RecentCatches recentCatches={props.recentCatches} />;
  const chat = <>
    &quot;Chatbox coming SOON&trade;&quot;
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
