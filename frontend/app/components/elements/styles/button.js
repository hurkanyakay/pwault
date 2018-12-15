import styled, { css } from 'styled-components';
import { darken, parseToRgb, rgba } from 'polished';
import assign from 'lodash/assign';

import { Colors, themeColors } from 'components/utils/colors';

import * as Icon from '../../elements/styles/icon';
import { rotate360 } from 'components/utils/animations';

import { BUTTON_SIZES } from '../constants/buttons';
import { ICON_SIZES } from '../constants/icons';

const hasIconLeftMixin = css` &:first-child { margin-right: 0.5rem; } `;
const hasIconRightMixin = css` &:last-child { margin-left: 0.5rem; } `;

const blankMixin = css`
  padding: 0;
  height: auto;
  background-color: transparent;
  border: none;
  line-height: inherit;
  color: ${({ theme, color }) => themeColors[color]};
  white-space: normal;
  text-align: left;

  &:hover,
  &:focus {
    color: ${({ theme, color }) => themeColors[color]};
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;

    ${Icon.Path} {
      fill: ${({ theme, color }) => themeColors[color]};
    }
  }

  ${Icon.Path} {
    fill: ${({ theme, color }) => themeColors[color]};
  }
`;

const monoMixin = css`
  color: ${({ theme, textColor }) => themeColors[textColor]};

  ${Icon.Path} {
    fill: ${({ theme, textColor }) => themeColors[textColor]};
  }
`;

const outlineMixin = css`
  background-color: transparent;
  border-color: ${({ theme, color }) => themeColors[color]};
  color: ${({ theme, color }) => themeColors[color]};

  &:hover,
  &:focus {
    color: white;
    background-color: ${({ theme, color }) => themeColors[color]};

    ${Icon.Path} {
      fill: white;
    }
  }

  ${Icon.Path} {
    fill: ${({ theme, color }) => themeColors[color]};
  }
`;

const invertedMixin = css`
  background-color: white;
  color: ${({ theme, color }) => themeColors[color]};

  &:hover,
  &:focus {
    background-color: ${darken(0.025, 'white')};
  }

  ${Icon.Path} {
    fill: ${({ theme, color }) => themeColors[color]};
  }
`;

const disabledMixin = css`
  color: #eee;
  background-color: #ccc;
  cursor: not-allowed !important;
  pointer-events: initial !important;

  &:hover,
  &:focus {
    box-shadow: none;
    background-color: #ccc;
  }

  ${Icon.Path} {
    fill: #eee;
  }
`;

const loadingMixin = css`
  color: transparent;
  pointer-events: none;

  &:hover,
  &:focus {
    box-shadow: none;
  }

  &:after {
    position: absolute;
    left: calc(50% - (1.6rem / 2));
    top: calc(50% - (1.6rem / 2));
    display: block;
    height: 1.6rem;
    width: 1.6rem;

    border: 2px solid white;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;

    content: '';

    animation: ${rotate360} 500ms infinite linear;
  }

  ${Icon.Svg} {
    visibility: hidden;
  }
`;

const buttonMixin = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;

  height: 2.25em;
  padding-top: calc(0.375em - 1px);
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);

  background-color: ${({ theme, color }) => themeColors[color]};
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 6px;
  color: white;

  font-size: ${({ size }) => BUTTON_SIZES[size]}rem;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  white-space: nowrap;

  appearance: none;
  user-select: none;
  cursor: pointer;

  transition: all 100ms ease;

  &:hover,
  &:focus {
    background-color: ${({ theme, color }) => darken(0.025, themeColors[color])};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.35rem ${({ theme, color }) => {
      return rgba(assign(parseToRgb(themeColors[color]), { alpha: 0.25 }))
      }};
    z-index: 1;
  }

  &:active {
    border-color: ${({ theme, color }) => darken(0.05, themeColors[color])};
  }

  ${Icon.Svg} {
    width: ${({ size }) => ICON_SIZES[size]}rem;
    height: ${({ size }) => ICON_SIZES[size]}rem;
    ${({ hasIconLeft }) => hasIconLeft ? hasIconLeftMixin : null};
    ${({ hasIconRight }) => hasIconRight ? hasIconRightMixin : null};
  }

  ${Icon.Path} {
    fill: white;
  }

  ${({ type }) => type === 'outline' ? outlineMixin : null};
  ${({ type }) => type === 'inverted' ? invertedMixin : null};
  ${({ type }) => type === 'blank' ? blankMixin : null};
  ${({ type }) => type === 'mono' ? monoMixin : null};
  ${({ disabled }) => disabled ? disabledMixin : null};
  ${({ loading }) => loading ? loadingMixin : null};
`;

export const Button = styled.button`
  ${buttonMixin};
`;

export const ButtonGroup = styled.div`
  white-space: nowrap;

  ${Button} + ${Button} {
    margin-left: 1rem;
  }
`;
