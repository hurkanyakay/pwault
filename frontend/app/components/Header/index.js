import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, Responsive } from 'semantic-ui-react'
import favicon from 'images/vault.png';
import * as Tags from './styles';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const encodedFn = encodeURIComponent(`function(){ window.open('${SERVER_URL}/search?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title))  }`)
const encoded = `javascript:(${encodedFn})()`

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {}
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }
  logout=()=>{
    this.props.header.logout()
  }
  render() {
    const { activeItem } = this.state
    return (
        <Menu size="mini">
          <Menu.Item>
            <img src={favicon} />
          </Menu.Item>

          <Menu.Item
            name='Home'
            active={activeItem === 'Home'}
          >
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item
            name='New'
            active={activeItem === 'New'}
          >
            <Link to="/account/new">New Account</Link>
          </Menu.Item>

          <Responsive as={Menu.Item} minWidth={768} name='Bookmark'>
            <a className="bookmarklet" href={encoded}>Vault Bookmarklet</a>
          </Responsive>

          <Menu.Menu position='right'>
             <Menu.Item>
               <Responsive as={Button} minWidth={768} primary onClick={this.logout}>
                 Logout
               </Responsive>
               <Responsive size="mini" as={Button} maxWidth={768} primary onClick={this.logout}>
                 Logout
               </Responsive>
              {/* <Button primary onClick={this.logout}>Logout</Button> */}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    );
  }
}

export default Header;
