/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import * as UiActions from 'containers/App/actions/ui';
import * as Actions from 'containers/App/actions/common';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import Flash from 'components/Flash';
import { userIsAuthenticated, userIsAuthenticatedRedir } from 'utils/auth';

import HomePage from 'containers/HomePage/Loadable';
import Account from 'containers/Account/Loadable';
import Login from 'containers/Login/Loadable';
import Search from 'containers/Search/Loadable';
import Register from 'containers/Register/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const LoggedHeader = userIsAuthenticated((header) => <Header header={header}/>)
const uHomePage = userIsAuthenticatedRedir(HomePage);
const uAccount = userIsAuthenticatedRedir(Account);
const uSearch = userIsAuthenticatedRedir(Search);

class App extends React.Component {
  componentWillMount(){
    var token = localStorage.getItem('token');
    if(token !== null && typeof token !== 'undefined'){
      this.props.dispatch(Actions.tokenVerifyReq(token))
    }
  }
  renderFlashMessages() {
    const { ui, dispatch } = this.props;
    return isEmpty(ui.flashMessages) ? null : (
      <Flash
        zIndex={9999}
        showFlash
        messages={ui.flashMessages[0].context}
        status={ui.flashMessages[0].status}
        onClose={() => dispatch(UiActions.closeFlashMessage(ui.flashMessages[0]))}
      />
    );
  }
  renderModals() {
    const { ui, dispatch } = this.props;

    if (isEmpty(ui.modals)) { return null; }

    const modals = ui.modals.map((item, i) => <Modal item={item} key={i} onClose={(modal) => dispatch(UiActions.closeModal(modal))} />);
    return (
      <div>
        {modals}
      </div>
    );
  }
  renderPageLoading() {
    const { ui } = this.props;
    if (ui.pageLoading) {
      return (
        <Loading />
      );
    }
    return null;
  }
  logout=()=>{
    localStorage.clear();
    this.props.dispatch(Actions.logout())
  }
  render() {

    return (
      <div style={{height:'100%'}}>
        <LoggedHeader session={this.props.session} logout={this.logout}/>
        <Switch>
          <Route exact path="/" component={uHomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/account/:id" component={uAccount} />
          <Route exact path="/search" component={uSearch} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFoundPage} />
        </Switch>
        {this.renderModals()}
        {this.renderFlashMessages()}
        {this.renderPageLoading()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { ui, session } = state.get('global');
  return ({
    ui: ui.toJS(),
    session,
  });
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
