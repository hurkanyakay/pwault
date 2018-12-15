/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { map, assign, mapKeys } from 'lodash';
import {copyTextToClipboard} from 'utils/utilFunctions';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import * as selectors from './selectors';
import lockpng from './lock.png';
import Password from './Password';

import { Grid, Menu, Segment, Input, Image, Button, Icon, Responsive } from 'semantic-ui-react';

const MenuOverflow = styled(Menu)`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 500px;
`
const PRow = styled(Grid.Row)`
  padding: 0.5rem 0;
`
const Truncate = styled.a`
  display: block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    activeItem: 0,
    searchValue: '',
    searchedAccounts: []
  }
  componentDidMount(){
    this.props.dispatch(Actions.AllAccountsFetchReq())
  }
  componentWillReceiveProps(nextprops){
    if(nextprops.AllAccounts.length>0){
      this.setState({
        searchedAccounts: nextprops.AllAccounts,
        activeItem: String(nextprops.AllAccounts[0].id)
      })
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  containsRegex(a, regex){
    var nameSearch = []
    var siteSearch = []
    for(var i = 0; i < a.length; i++) {
      var pos = a[i].name.search(regex);
      if(pos > -1){
        nameSearch.push(a[i])
      }
      var posW = a[i].website.search(regex);
      if(posW > -1){
        siteSearch.push(a[i])
      }
    }
    return { nameSearch, siteSearch}
  }

  searchChange=(data)=>{
    var value = data.target.value.toLowerCase();
    if(value.length > 2){
      const { nameSearch, siteSearch } = this.containsRegex(this.props.AllAccounts, value)

      const data = map(assign(
        mapKeys(nameSearch,  k => k.id),
        mapKeys(siteSearch, k => k.id)
      ))

      this.setState({
        searchValue: value,
        searchedAccounts: data
      })
    }else if(value === ''){
      this.resetSearch()
    }else{
      this.setState({
        searchValue: value
      })
    }
  }
  resetSearch(){
    this.setState({
      searchValue: '',
      searchedAccounts: this.props.AllAccounts
    })
  }

  renderMenuItems(){
    const { activeItem, searchedAccounts } = this.state
    const items = searchedAccounts.map((item,i)=>{
      return(
        <Menu.Item key={`menu${i}`} name={String(item.id)} active={activeItem === String(item.id)} onClick={this.handleItemClick}>
          {item.favicon ? <span><img style={{width:18, height:18}} src={'data:image/png;base64, '+item.favicon} /></span> : null}
          <span style={{marginLeft: 10}}>{item.name}</span>
        </Menu.Item>
      )
    })
    return items;
  }
  renderAccount(acc){
    return(
      <Grid>
        <Grid.Row>

          <Responsive as={Grid.Column} minWidth={768} computer={3}>
          </Responsive>

          <Grid.Column computer={10} mobile={16}>
            <h2>
              {acc.favicon ? <center><img style={{width:25, height:25}} src={'data:image/png;base64, '+acc.favicon} /></center> : <center> <Image src={lockpng} size='mini'/></center>}
              <center> {acc.name} </center>
            </h2>

            <Grid>
              <PRow>
                <Grid.Column computer={8} mobile={4} textAlign="right">
                    Username:
                </Grid.Column>
                <Grid.Column width={8}>
                    <Button size="mini" onClick={()=>copyTextToClipboard(acc.username)}>Copy</Button>
                    {acc.username}
                </Grid.Column>
              </PRow>
              <PRow>
                <Grid.Column computer={8} mobile={4} textAlign="right">
                  Password:
                </Grid.Column>
                <Grid.Column width={8} >
                  <Button size="mini" onClick={()=>copyTextToClipboard(acc.password)}>Copy</Button>
                  <Password pass={acc.password}/>
                </Grid.Column>
              </PRow>
              <PRow>
                <Grid.Column computer={8} mobile={4} textAlign="right">
                  Email:
                </Grid.Column>
                <Grid.Column width={8}>
                  <Button size="mini" onClick={()=>copyTextToClipboard(acc.email)}>Copy</Button>
                  {acc.email}
                </Grid.Column>
              </PRow>
              <PRow>
                <Grid.Column computer={8} mobile={4} textAlign="right">
                  Website:
                </Grid.Column>
                <Grid.Column width={8}>
                  <Truncate href={acc.website} target="_blank" >{acc.website}</Truncate>
                </Grid.Column>
              </PRow>
              <PRow>
                <Grid.Column computer={8} mobile={4} textAlign="right">
                  Additional:
                </Grid.Column>
                <Grid.Column width={8}>
                  {acc.additional}
                </Grid.Column>
              </PRow>
              <PRow>
                <Grid.Column width={16}>
                  <center>
                    <Link className="ui mini button" to={`/account/${acc.id}`}>Edit</Link>
                  </center>
                </Grid.Column>
              </PRow>
            </Grid>

          </Grid.Column>

          <Responsive as={Grid.Column} minWidth={768} computer={3}>
          </Responsive>
        </Grid.Row>
      </Grid>
    )
  }
  renderRight(){
    const { activeItem } = this.state
    var selected = this.props.AllAccounts.filter((item)=> String(item.id) === activeItem)
    if(selected.length > 0){
      return(
        <Segment>
          {this.renderAccount(selected[0])}
        </Segment>
      )
    }else{
      return(
        <Segment>
          Click any account
        </Segment>
      )
    }
  }
  render() {
    const { activeItem, searchValue } = this.state
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          <Grid stackable>
            <Grid.Column width={4}>
              {
                searchValue === '' ?
              <Input fluid icon='search'
                placeholder='Search account...'
                onChange={this.searchChange}
                value={searchValue}
              />
              :
              <Input fluid icon='search'
                onChange={this.searchChange}
                icon={<Icon name='close' inverted circular link onClick={()=>this.resetSearch()}/>}
                placeholder='Search account...'
                value={searchValue}
              />
            }
              <MenuOverflow fluid vertical>
                {this.renderMenuItems()}
              </MenuOverflow>
            </Grid.Column>

            <Grid.Column stretched width={12}>
              {this.renderRight()}
            </Grid.Column>
          </Grid>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const mapStateToProps = createStructuredSelector({
  AllAccounts: selectors.makeSelectAllAccounts(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
