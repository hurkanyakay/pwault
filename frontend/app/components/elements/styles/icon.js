import styled from 'styled-components';

export const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;
`;

export const Path = styled.path`
  fill: ${({ color = 'black' }) => color};
`;
