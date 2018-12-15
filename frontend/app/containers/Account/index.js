/**
 *
 * Account
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as UiActions from 'containers/App/actions/ui';
import makeSelectAccount from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import { validateEmail, validateWebsite, extractRootDomain } from 'utils/utilFunctions';

import { Container, Grid, Form, Button, Icon } from 'semantic-ui-react'
import Generator from './Generator';

export class Account extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    id: '',
    name: '',
    username: '',
    password: '',
    email: '',
    website: '',
    favicon: false,
    additional: '',
    date: '',
  }
  componentWillMount(){
    const parsed = queryString.parse(this.props.location.search);
    if(Object.keys(parsed).length > 0){
      this.setState({
        website: parsed.url,
        additional: parsed.title,
      })
      this.props.dispatch(Actions.getFaviconReq(parsed.url))
    }
  }
  useDomain(){
    var name = extractRootDomain(this.state.website)
    this.setState({
      name
    })
  }
  componentWillReceiveProps(nextprops){
    const id = nextprops.match.params.id || false;

    if(id === 'new' && this.state.id !== ''){
      // 2 -> new
      nextprops.dispatch(Actions.SingleAccountReset())
      this.setState({
        id:'', name:'', username:'', password:'', email:'', website:'', additional:''
      })
    }else if((id !== 'new' && this.state.id === '')){
      // first time props to state
      if(nextprops.account.singleAcc.data){
        const {id, name, username, password, email, website, favicon, additional, date } = nextprops.account.singleAcc.data;
        this.setState({
          id, name, username, password, email, website, favicon, additional, date
        })
      }
    }else{
      const { data: favicon = false } = nextprops.account.favicon;
      if(favicon && favicon !== this.state.favicon) {
        this.setState({
          favicon
        })
      }
    }
  }
  componentWillUnmount(){
    this.props.dispatch(Actions.SingleAccountReset())
    this.setState({
      id:'', name:'', username:'', password:'', email:'', website:'', favicon:'',additional:'', date:''
    })
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    if(name === "website"){
      if(validateWebsite(value)){
        this.props.dispatch(Actions.getFaviconReq(value))
      }
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id || false;
    if (id !== 'new') {
      this.props.dispatch(Actions.SingleAccountFetchReq({id}))
    }
  }

  checkValidity(){
    const { name, username, password, email, website, favicon, additional } = this.state
    if(!validateEmail(email)){
      const message = {
        context: [{ detail: 'Email is wrong!' }],
        status: 'error',
        timeout: 2000
      }
      this.props.dispatch(UiActions.openFlashMessage(message))
      return false;
    }
    if(!validateWebsite(website)){
      const message = {
        context: [{ detail: 'Website is wrong!' }],
        status: 'error',
        timeout: 2000
      }
      this.props.dispatch(UiActions.openFlashMessage(message))
      return false;
    }
    if(name === ''){
      const message = {
        context: [{ detail: 'Name is missing!' }],
        status: 'error',
        timeout: 2000
      }
      this.props.dispatch(UiActions.openFlashMessage(message))
      return false;
    }
    if(username === ''){
      const message = {
        context: [{ detail: 'Username is missing!' }],
        status: 'error',
        timeout: 2000
      }
      this.props.dispatch(UiActions.openFlashMessage(message))
      return false;
    }
    if(!favicon){
      const message = {
        context: [{ detail: 'No favicon!' }],
        status: 'error',
        timeout: 2000
      }
      this.props.dispatch(UiActions.openFlashMessage(message))
      return false;
    }
    return true;
  }
  handleSubmit = () => {
    const id = this.props.match.params.id || false;
    if(id == this.state.id){
      if(this.checkValidity()){
        this.props.dispatch(Actions.SingleAccountUpdateReq(this.state))
      }
    }else{
      if(this.checkValidity()){
        this.props.dispatch(Actions.SingleAccountSaveReq(this.state))
      }
    }
  }
  deleteButton=()=>{
    const { id } = this.state
    this.props.dispatch(UiActions.openModal({
      type: 'confirmation',
      title: 'Are you sure you want to destroy this acccount?',
      confirmLabel: 'Yes, destroy',
      cancelLabel: 'No, cancel',
      onConfirm: () => this.props.dispatch(Actions.SingleAccountDeleteReq(id)),
    }))
  }
  render() {
    const { id, name, username, password, email, website, additional, favicon } = this.state
    // console.log(this.props);
    //
    // console.log("this.state",this.state);
    return (
      <div>
        <Helmet>
          <title>Account</title>
          <meta name="description" content="Description of Account" />
        </Helmet>
        <Container>
          <Grid columns={3} stackable>
            <Grid.Row>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input icon={<Icon name='favorite' inverted circular link onClick={()=>this.useDomain()}/>} autoComplete="name" label="Name" placeholder='Name' name='name' value={name} onChange={this.handleChange} />
                    <Form.Input autoComplete="username" label="Username" placeholder='Username' name='username' value={username} onChange={this.handleChange} />
                    <Form.Input icon={<Generator select={(e)=>this.setState({password: e})}/>} autoComplete="password" label="Password" placeholder='Password' name='password' value={password} onChange={this.handleChange} />
                    <Form.Input autoComplete="email" label="Email" placeholder='Email' name='email' value={email} onChange={this.handleChange} />
                    <Form.Input autoComplete="website" label="website" placeholder='Website' name='website' value={website} onChange={this.handleChange} />
                    {favicon ? <center><img style={{width:25, height:25}} src={'data:image/png;base64, '+favicon} /></center> : null}
                    <Form.TextArea label="Additional" placeholder='Additional...' name='additional' value={additional} onChange={this.handleChange} />
                    <center><Form.Button fluid content='Submit' /></center>
                </Form>
                {id !== '' ? <center style={{marginTop: 60}}><Button onClick={this.deleteButton} negative>Delete</Button></center> : null }
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'account', reducer });
const withSaga = injectSaga({ key: 'account', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Account);
