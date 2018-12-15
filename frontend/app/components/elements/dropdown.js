import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ReactPageClick } from 'react-page-click';
import { injectIntl } from 'react-intl';

import { Colors } from 'components/utils/styles/ui';

import * as Tag from './styles/dropdown';

import Icon from './icon';

import i18n from './utils/i18n';

class Dropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeMenu: false,
      typeaheadValue: '',
      selectedItem: null,
    };
  }

  componentDidUpdate() {
    if (this.typeaheadInput && this.state.activeMenu) {
      this.typeaheadInput.focus();
    }
  }

  optionSelected(event, optionItem) {
    event.preventDefault();
    event.stopPropagation();

    this.toggleOption(event);

    if (this.props.onSelect) {
      this.props.onSelect(optionItem.slug);
    }

    if (optionItem.fn) {
      optionItem.fn();
    }

    this.setState({ selectedItem: null });
  }

  optionMenuItems() {
    const { options } = this.props;

    let links = options.map((optionItem) => {
      const item = Object.assign({}, optionItem);
      item.fn = (event) => this.optionSelected(event, optionItem);

      return item;
    });

    if (this.typeaheadEnabled()) {
      const typeaheadValue = this.state.typeaheadValue || '';
      const re = new RegExp(typeaheadValue.replace(/[^a-zA-Z ]/g, ''), 'i');

      links = links.filter((optionItem) =>
        re.test(optionItem.linkName.defaultMessage || optionItem.linkName)
      );
    }

    return {
      type: 'verticalbox',
      selected: this.state.selectedItem,
      links,
    };
  }

  toggleOption(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({ activeMenu: !this.state.activeMenu });
  }

  typeaheadEnabled() {
    const { typeahead = true, options } = this.props;
    return typeahead && options && options.length >= 5;
  }

  handleTypeaheadChange(value) {
    this.setState({ typeaheadValue: value, selectedItem: null });
  }

  handleKeyUp(event) {
    const options = this.optionMenuItems().links;

    switch (event.keyCode) {
      case 13: {
        if (this.state.selectedItem != null) {
          options[this.state.selectedItem].fn(event);
        }
        break;
      }
      case 38: {
        const selectedItem = this.state.selectedItem === null ? options.length : this.state.selectedItem;
        const index = ((options.length + selectedItem) - 1) % options.length;

        this.setState({ selectedItem: index });
        this.optionsMenu.scrollTo(index);
        break;
      }
      case 40: {
        const selectedItem = this.state.selectedItem === null ? -1 : this.state.selectedItem;
        const index = (selectedItem + 1) % options.length;

        this.setState({ selectedItem: index });
        this.optionsMenu.scrollTo(index);
        break;
      }
      default:
        break;
    }
  }

  handleKeyPress(event) {
    if (event.nativeEvent.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    const { className, padding = null, children, intl, typeaheadPlaceholder } = this.props;

    const { activeMenu } = this.state;

    const iconDirection = activeMenu ? 'chevron-up' : 'chevron-down';

    const placeholder = typeaheadPlaceholder || i18n.typeahead;

    return (
      <ReactPageClick notify={() => this.setState({ activeMenu: false })}>
        <Tag.Select className={className}>
          <Tag.OptionSelected
            onClick={(event) => this.toggleOption(event)}
            padding={padding}
          >
            {children}

            <Icon
              icon={iconDirection}
              size="large"
              color={Colors.darkGray}
            />
          </Tag.OptionSelected>
          <Tag.OptionsWrapper activeMenu={activeMenu}>
            { this.typeaheadEnabled() &&
              <Tag.OptionsTypeahead
                autoFocus
                placeholder={intl.formatMessage(placeholder)}
                onInnerRef={(input) => { this.typeaheadInput = input; }}
                value={this.state.typeaheadValue}
                shouldValidate={false}
                onChange={(value) => this.handleTypeaheadChange(value)}
                onKeyUp={(event) => this.handleKeyUp(event)}
                onKeyPress={(event) => this.handleKeyPress(event)}
              />
            }
            <Tag.Options
              context={this.optionMenuItems()}
              innerRef={(options) => { this.optionsMenu = options; }}
            />
          </Tag.OptionsWrapper>
        </Tag.Select>
      </ReactPageClick>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  padding: PropTypes.string,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  intl: PropTypes.object,
  typeaheadPlaceholder: PropTypes.string,
  typeahead: PropTypes.bool,
};

Dropdown.defaultProps = {
  options: [],
};

export default injectIntl(Dropdown);
