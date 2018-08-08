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
`]);
