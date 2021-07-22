import React from 'react';

const navIcons = [
  {
    id: 'home',
    icon: 'fa-home',
    text: 'HOME',
    href: '#'
  },
  {
    id: 'tourneys',
    icon: 'fa-trophy',
    text: 'TOURNEYS',
    href: '#tournaments'
  },
  {
    id: 'logCatch',
    icon: 'fa-book-medical',
    text: 'LOG CATCH',
    href: '#logcatch'
  },
  {
    id: 'profile',
    icon: 'fa-user-circle',
    text: 'PROFILE',
    href: '#profile'
  },
  {
    id: 'settings',
    icon: 'fa-sliders-h',
    text: 'SETTINGS',
    href: '#settings'
  }
];

function NavIcon(props) {
  return (
    <a href={props.href}
      id={props.id}
      className="nav-icon"
      onClick={props.onClick} >
      <i className={'fas ' + props.icon + props.selected} />
      <span className={props.selected}>{props.text}</span>
    </a>
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
          href={nav.href}
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
