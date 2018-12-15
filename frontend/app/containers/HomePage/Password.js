import React from 'react';
import { Button } from 'semantic-ui-react'

class Password extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    open: false
  }
  handleItemClick = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { open } = this.state
    const { pass } = this.props
    return (
      <span>
        <Button size="mini" onClick={this.handleItemClick}>Reveal</Button>

        {open ? pass : '******'}
      </span>
    );
  }
}

export default Password;
