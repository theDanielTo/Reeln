import React from 'react';
import { parseRoute } from '../lib';

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
  }
  // {
  //   id: 'logCatch',
  //   icon: 'fa-book-medical',
  //   text: 'LOG CATCH',
  //   href: '#logcatch'
  // }
  // {
  //   id: 'profile',
  //   icon: 'fa-user-circle',
  //   text: 'PROFILE',
  //   href: '#profile'
  // },
  // {
  //   id: 'settings',
  //   icon: 'fa-sliders-h',
  //   text: 'SETTINGS',
  //   href: '#settings'
  // }
];

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.handleClick = this.handleClick.bind(this);
    this.fillNavIcons = this.fillNavIcons.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleClick(e) {
    this.setState({ page: e.target.closest('.nav-icon').id });
  }

  fillNavIcons() {
    return navIcons.map(nav => {
      const selected = ('#' + this.state.route.path === nav.href)
        ? ' selected'
        : '';
      return (
        <NavIcon
          href={nav.href}
          key={nav.id}
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

function NavIcon(props) {
  return (
    <a href={props.href}
      id={props.id}
      className="nav-icon link-no-deco"
      onClick={props.onClick} >
      <i className={'fas ' + props.icon + props.selected} />
      <span className={props.selected}>{props.text}</span>
    </a>
  );
}
