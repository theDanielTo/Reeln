import React from 'react';
import { parseRoute } from '../lib';

const navLinks = [
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

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.fillNavLinks = this.fillNavLinks.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  fillNavLinks() {
    return navLinks.map(nav => {
      const selected = ('#' + this.state.route.path === nav.href)
        ? ' selected link-selected'
        : '';
      return (
        <DrawerLink
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
    const drawerVisible = this.state.isOpen ? '' : 'drawer-minimized';
    const menuVisible = this.state.isOpen ? 'show-drawer' : 'hide-drawer';
    const dimVisible = this.state.isOpen ? '' : 'hidden';
    return (
      <>
        <i className="fas fa-bars drawer-icon"
          onClick={this.handleClick} />
        <nav className={drawerVisible + ' app-drawer'}>
          <div className={menuVisible + ' drawer'}>
            <div className="user-avatar">
              <img src="./images/userAvatar/daniel-avatar.jpg" alt="Avatar" />
            </div>
            <h1>Daniel To</h1>
            {this.fillNavLinks()}
          </div>
          <div
            className={dimVisible + ' page-dim'}
            onClick={this.handleClick} />
        </nav>
      </>
    );
  }
}

function DrawerLink(props) {
  return (
    <a
      href={props.href}
      id={props.id}
      className={'drawer-link' + props.selected}
      onClick={props.onClick}>
      <i className={'fas ' + props.icon} />
      <span>{props.text}</span>
    </a>
  );
}
