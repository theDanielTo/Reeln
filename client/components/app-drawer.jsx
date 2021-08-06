import React from 'react';
import AppContext from '../lib/app-context';
import { parseRoute, getToken } from '../lib';

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
  }
  // {
  //   id: 'logCatch',
  //   icon: 'fa-book-medical',
  //   text: 'LOG CATCH',
  //   href: '#logcatch'
  // },
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

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      avatarUrl: './images/default-avatar.jpg',
      fileName: 'No File Selected',
      isOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.editAvatar = this.editAvatar.bind(this);
    this.fillNavLinks = this.fillNavLinks.bind(this);
  }

  componentDidMount() {
    fetch('/api/users', {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.avatar) {
          this.setState({ avatarUrl: './images/' + result.avatar });
        }
      })
      .catch(err => console.error(err));
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleFileChange(e) {
    this.setState({ fileName: e.target.value });
  }

  editAvatar(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/api/users/upload', {
      method: 'POST',
      headers: {
        'x-access-token': getToken()
      },
      body: formData
    })
      .then(res => res.json())
      .then(result => this.setState({ fileName: e.target.value }))
      .catch(err => console.error(err));
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
    const { user, handleSignOut } = this.context;
    if (user) {
      return (
        <>
          <i className="fas fa-bars drawer-icon"
            onClick={this.handleClick} />
          <nav className={drawerVisible + ' app-drawer'}>
            <div className={menuVisible + ' drawer'}>
              <div className="user-avatar">
                <img src={this.state.avatarUrl} alt="Avatar" />
                <h1>{user.firstName} {user.lastName}</h1>
                <form onSubmit={this.editAvatar}>
                  <label htmlFor="image"
                    className="custom-file-upload">
                    <i className="fas fa-pen" />
                    <span>  {this.state.fileName}</span>
                  </label>
                  <input required hidden
                    type="file" name="image" id="image"
                    onChange={this.handleFileChange} />
                  <button type="submit">Change Avatar</button>
                </form>
                {user !== null &&
                <a href="#sign-in">
                  <button
                    className="sign-out-btn"
                    onClick={handleSignOut}>
                    {'Sign out '}
                    <i className="fas fa-sign-out-alt" />
                  </button>
                </a>
                }
              </div>
              {this.fillNavLinks()}
            </div>
            <div
              className={dimVisible + ' page-dim'}
              onClick={this.handleClick} />
          </nav>
        </>
      );
    } else {
      return null;
    }
  }
}

AppDrawer.contextType = AppContext;

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
