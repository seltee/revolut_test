import styled from 'styled-components';

export const CurrenciesComponent = styled.div`
  text-align: center;
  line-height: 20px;
`;

export const Currency = styled.div`
  display: inline-block;
  font-size: 10px;
  padding: 2px 4px;
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`;
