import styled, { keyframes } from 'styled-components';

import Spinner from './generic-spinner';

const AnimateDot = keyframes`
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

export const LoadingLogo = styled(Spinner)`
  &>.spinner {
    margin: 0 auto;
    width: ${({ incrementalFactor }) => 50 * incrementalFactor}px;
    text-align: center;

    &>div {
      width: ${({ incrementalFactor }) => 12 * incrementalFactor}px;
      height: ${({ incrementalFactor }) => 12 * incrementalFactor}px;
      background-color: ${({ color }) => color};

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: ${AnimateDot} 1.4s infinite ease-in-out both;
      animation: ${AnimateDot} 1.4s infinite ease-in-out both;
    }

    &>.bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &>.bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }
`;
