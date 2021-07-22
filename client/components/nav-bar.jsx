import React from 'react';

const navIcons = [
  {
    id: 'home',
    icon: 'fa-home',
    text: 'HOME'
  },
  {
    id: 'tourneys',
    icon: 'fa-trophy',
    text: 'TOURNEYS'
  },
  {
    id: 'logCatch',
    icon: 'fa-book-medical',
    text: 'LOG CATCH'
  },
  {
    id: 'profile',
    icon: 'fa-user-circle',
    text: 'PROFILE'
  },
  {
    id: 'settings',
    icon: 'fa-sliders-h',
    text: 'SETTINGS'
  }
];

function NavIcon(props) {
  return (
    <div
      id={props.id}
      className="nav-icon"
      onClick={props.onClick} >
      <i className={'fas ' + props.icon + props.selected} />
      <span className={props.selected}>{props.text}</span>
    </div>
  );
}
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home'
    };
    this.handleClick = this.handleClick.bind(this);
    this.fillNavIcons = this.fillNavIcons.bind(this);
  }

  handleClick(e) {
    this.setState({ page: e.target.closest('.nav-icon').id });
    this.props.onNavClick(e.target.closest('.nav-icon').id);
  }

  fillNavIcons() {
    return navIcons.map(nav => {
      const selected = (this.state.page === nav.id)
        ? ' selected'
        : '';
      return (
        <NavIcon
          key={nav.id}
          id={nav.id}
          onClick={this.handleClick}
          icon={nav.icon}
          selected={selected}
          text={nav.text} />
      );
    });
  }

  render() {
    return (
      <nav className="main-nav">
        {this.fillNavIcons()}
      </nav>
    );
  }
}
