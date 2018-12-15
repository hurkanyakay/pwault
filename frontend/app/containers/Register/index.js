/**
 *
 * Register
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Grid,Container, Button, Checkbox, Form } from 'semantic-ui-react';
import queryString from 'query-string';
import * as Actions from './actions';
import { CContainer,CForm } from './styles';
import icon from '../../images/icon-128x128.png'

export class Register extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { name: '', password: '', redirect: '/'}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    const { name, password } = this.state
    this.props.dispatch(Actions.RegisterReq({name, password, redirect}))
  }

  render() {
    const { name, password} = this.state
    return (
      <div style={{height:'100%'}}>
        <Helmet>
          <title>Register</title>
          <meta name="description" content="Description of Register" />
        </Helmet>
        <CContainer fluid>
          <img src={icon} height="70px" />
          <h3>Register</h3>
          <CForm onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>User</label>
              <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Form.Input type='password' placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </CForm>
        </CContainer>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Register: makeSelectRegister(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Register);
