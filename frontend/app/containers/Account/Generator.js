import React from 'react';
import { Button, Icon, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import { password_generator } from 'utils/utilFunctions';

const GeneratorWrapper = styled.div`
  height: 250px;
  width: 250px;
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 100;
`
const Slider = styled.input`
  padding: 0!important;
  padding-right: 0!important;
  margin: 0!important;
  display: inline-block;
`
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Generated = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: rgba(129, 129, 129, 0.1);
  overflow: hidden;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
`

class Generator extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    open: false,
    lengthChange: 15,
    string: true,
    numeric: true,
    punctuation: true,
    generated: ''
  }
  componentWillMount(){
    const { lengthChange, string, numeric, punctuation } = this.state
    const pass = password_generator(lengthChange, string, numeric, punctuation)
    this.setState({ generated: pass })
  }
  select = () => {
    this.props.select(this.state.generated)
    this.setState({ open: false });
  }
  handleItemOpen = () => {
    this.setState({ open: true })
  }
  handleItemClose = () => {
    this.setState({ open: false })
  }
  handleLengthChange = (e) => {
    const { string, numeric, punctuation } = this.state
    const pass = password_generator(e.target.value, string, numeric, punctuation)
    this.setState({
      lengthChange: e.target.value,
      generated: pass
    })
  }
  changeToggles = (e) => {
    var pass = '';
    var v = this.state[e];
    const { lengthChange, string, numeric, punctuation } = this.state
    switch (e) {
      case 'string': {
        pass = password_generator(lengthChange, !v, numeric, punctuation)
        break;
      }
      case 'numeric': {
        pass = password_generator(lengthChange, string, !v, punctuation)
        break;
      }
      case 'punctuation': {
        pass = password_generator(lengthChange, string, numeric, !v)
        break;
      }
    }
    this.setState({
      [e] : !v,
      generated: pass
    })
  }
  renderGenerator(){
    const { lengthChange, string, numeric, punctuation, generated } = this.state
    return(
      <GeneratorWrapper>
        <div>Length: </div>
        <SliderWrapper>
          <Slider type='range' min={5} max={30} value={lengthChange} onChange={this.handleLengthChange} />
          <span style={{margin:10}}>{lengthChange}</span>
        </SliderWrapper>
        <SliderWrapper>
          <span>String:</span>
          <span><Checkbox toggle checked={string} onClick={()=>this.changeToggles('string')}/></span>
        </SliderWrapper>
        <SliderWrapper>
          <span>Numeric:</span>
          <span><Checkbox toggle checked={numeric} onClick={()=>this.changeToggles('numeric')}/></span>
        </SliderWrapper>
        <SliderWrapper>
          <span>Punctuation</span>
          <span><Checkbox toggle checked={punctuation} onClick={()=>this.changeToggles('punctuation')}/></span>
        </SliderWrapper>
        <Generated>{generated}</Generated>
        <Buttons>
          <Button as="span" size="mini" onClick={this.select}>Select</Button>
          <Button as="span" size="mini" onClick={this.handleItemClose}>Close</Button>
        </Buttons>
      </GeneratorWrapper>
    )
  }
  render() {
    const { open } = this.state
    const { pass } = this.props
    return (
      <span style={{position: 'absolute', top: '.35em', right: '.5em'}}>
        <Icon name='settings' inverted circular link onClick={this.handleItemOpen}>
        </Icon>
        {open ? this.renderGenerator() : null}
      </span>


    );
  }
}
export default Generator;
