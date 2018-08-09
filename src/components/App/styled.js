import styled, { injectGlobal } from 'styled-components';

export const AppComponent = styled.div`
  position: absolute;
  width: 400px;
  left: 50%;
  margin-left: -201px;
  top: 50%;
  margin-top: -201px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  font-family: 'Ubuntu', sans-serif;
`;

export const Border = styled.div`
  border-top: 1px solid #ddd;
`;

export const DividedBlock = styled.div`
  height: 140px;

  > div {
    display: inline-block;
    width: 50%;
    vertical-align: top;
  }
`;

export const CurrencyBig = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  font-size: 40px;
`;

export const CurrencyInput = styled.input`
  border: none;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  font-size: 40px;
  margin-top: 40px;
  width: 100%;
`;

export const ExchangeButton = styled.button`
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  display: block;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  opacity: ${(props) => (props.isAvailable ? 0.8 : 0.2)}
  pointer-events: ${(props) => (props.isAvailable ? 'all' : 'none')}
  
  :hover {
    opacity: 1
  }
`;

injectGlobal([`
  * {
    margin: 0;
    padding: 0;
    list-style-type: none;
    text-decoration: none;
    font-weight: normal;
    outline: none;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
    background-color: #fff;
  }
  
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
`]);
