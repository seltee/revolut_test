import React from 'react';
import PropTypes from 'prop-types';
import Rate from 'components/Rate';
import CurrencySelect from 'components/CurrencySelect';
import CurrencyStatus from 'components/CurrencyStatus';
import { updateQuotations } from 'actions/quotationsActions';
import { makeExchange } from 'actions/balanceActions';
import { convertCurrency, validateMoney, eventOnlyValue } from 'src/helpers';
import { connect } from 'react-redux';

import {
  AppComponent,
  DividedBlock,
  Border, CurrencyBig,
  CurrencyInput,
  ExchangeButton
} from './styled';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curFrom: 'RUB',
      curTo: 'USD',
      valFrom: '0.00',
      valTo: '0.00',
      editingFrom: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // converts last selected currency
    if (prevState.editingFrom) {
      return {
        valTo: convertCurrency(
          prevState.valFrom,
          nextProps.quotations[prevState.curFrom],
          nextProps.quotations[prevState.curTo]
        )
      };
    }
    return {
      valFrom: convertCurrency(
        prevState.valTo,
        nextProps.quotations[prevState.curTo],
        nextProps.quotations[prevState.curFrom]
      )
    };
  }

  componentDidMount() {
    this.props.updateQuotations();
    this.interval = setInterval(() => {
      this.props.updateQuotations();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSelectFrom = (currency) => {
    this.setState({
      curFrom: currency
    });
  };

  onSelectTo = (currency) => {
    this.setState({
      curTo: currency
    });
  };

  changeFrom = (event) => {
    this.setState({
      valFrom: validateMoney(event.target.value),
      editingFrom: true
    });
  };

  changeTo = (event) => {
    this.setState({
      valTo: validateMoney(event.target.value),
      editingFrom: false
    });
  };

  exchange = () => {
    const { curFrom, curTo, valFrom } = this.state;
    if (this.isExchangeAvailable()) {
      this.props.makeExchange(valFrom, curFrom, curTo);
    }
  };

  isExchangeAvailable = () => {
    const {
      curFrom, curTo, valFrom, valTo
    } = this.state;

    if (
      this.props.balance[curFrom] >= parseFloat(valFrom) &&
      curFrom !== curTo &&
      parseFloat(valFrom) > 0 &&
      parseFloat(valTo) > 0) {
      return true;
    }
    return false;
  };

  render() {
    const {
      curFrom, curTo, valFrom, valTo
    } = this.state;

    return (
      <AppComponent>
        <Rate curFrom={curFrom} curTo={curTo} />
        <Border />

        <DividedBlock>
          <div>
            <CurrencyBig>{curFrom}</CurrencyBig>
            <CurrencyStatus currency={curFrom} />
          </div>
          <div>
            <CurrencyInput
              value={valFrom}
              onChange={this.changeFrom}
              onFocus={this.changeFrom}
              onKeyPress={eventOnlyValue}
            />
          </div>
        </DividedBlock>
        <CurrencySelect selected={curFrom} onSelectCurrency={this.onSelectFrom} />

        <Border />
        <DividedBlock>
          <div>
            <CurrencyBig>{curTo}</CurrencyBig>
            <CurrencyStatus currency={curTo} />
          </div>
          <div>
            <CurrencyInput
              value={valTo}
              onChange={this.changeTo}
              onFocus={this.changeTo}
              onKeyPress={eventOnlyValue}
            />
            <Rate curFrom={curTo} curTo={curFrom} mini />
          </div>
        </DividedBlock>
        <CurrencySelect selected={curTo} onSelectCurrency={this.onSelectTo} />

        <Border />
        <ExchangeButton
          onClick={this.exchange}
          isAvailable={this.isExchangeAvailable()}
        >
          Exchange
        </ExchangeButton>
      </AppComponent>
    );
  }
}

App.propTypes = {
  updateQuotations: PropTypes.func.isRequired,
  makeExchange: PropTypes.func.isRequired,
  balance: PropTypes.object.isRequired
};

export default connect(
  (state) => ({
    quotations: state.get('Quotations').toJS(),
    balance: state.get('Balance').get('values').toJS()
  }),
  { updateQuotations, makeExchange }
)(App);

