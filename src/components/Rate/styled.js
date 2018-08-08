import styled from 'styled-components';

export const RateComponent = styled.div`
  position: relative;
  height: ${(props) => (props.mini ? '28px' : '40px')};
  line-height: ${(props) => (props.mini ? '28px' : '40px')};
  text-align: ${(props) => (props.mini ? 'left' : 'center')};
  font-size: ${(props) => (props.mini ? '14px' : '17px')};
  display: block;
`;

export const Value = styled.div`
  display: inline-block;
`;

export const Equal = styled.div`
  display: inline-block;
  margin: 0 ${(props) => (props.mini ? '4px' : '8px')};
`;

export const Currency = styled.span`
  font-size: ${(props) => (props.mini ? '9px' : '10px')};
`;
