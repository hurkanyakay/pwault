/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';
import { push } from 'react-router-redux'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearch from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
`
const SearchItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #ccc;
  font-size: 20px;
  width: 350px;
  height: 60px;
  margin-bottom: 20px;
  flex-direction: row;
`

export class Search extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    title: '',
    url: '',
  }
  componentWillMount(){
    const parsed = queryString.parse(this.props.location.search);
    if(Object.keys(parsed).length === 0){
      this.props.dispatch(push('/'))
      return;
    }
    this.props.dispatch(Actions.searchQueryReq(parsed))
    this.setState({
      title: parsed.title,
      url: parsed.url
    })
  }
  renderResults(){
    const list = this.props.search.results.map((item,i)=>{
      return(
        <SearchItem onClick={()=> this.props.dispatch(push(`/account/${item.id}`))} key={"searchitem"+i}>
          <div><img style={{width:18, height:18}} src={'data:image/png;base64, '+item.favicon} /></div>
          <div style={{ width: 300}}>{item.name}</div>
        </SearchItem>
      )
    })
    return list
  }
  render() {
    // console.log("this.props", this.props);
    const { title, url } = this.state;
    return (
      <div>
        <Helmet>
          <title>Search</title>
          <meta name="description" content="Description of Search" />
        </Helmet>
        <center><h3>Search Results</h3></center>
        <SearchWrapper>
          {this.props.search.results.length > 0 ? this.renderResults() : null}
          <SearchItem onClick={()=> this.props.dispatch(push(`/account/new?title=${title}&url=${url}`))}>
            <div>New Account</div>
          </SearchItem>
        </SearchWrapper>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Search);
