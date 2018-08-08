import React from 'react';
import PropTypes from 'prop-types';
import Rate from 'src/components/Rate/index';
import RateShort from 'src/components/RateShort/index';
import CurrencySelect from 'src/components/CurrencySelect';
import CurrencyStatus from 'src/components/CurrencyStatus';
import { updateQuotations } from 'src/actions/quotationsActions';
import { convertCurrency } from 'src/helpers';

import { connect } from 'react-redux';

import { AppComponent, DividedBlock, Border, CurrencyBig, CurrencyInput } from './styled';

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
      valFrom: event.target.value,
      editingFrom: true
    });
  };

  changeTo = (event) => {
    this.setState({
      valTo: event.target.value,
      editingFrom: false
    });
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
            <CurrencyInput value={valFrom} onChange={this.changeFrom} onFocus={this.changeFrom} />
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
            <CurrencyInput value={valTo} onChange={this.changeTo} onFocus={this.changeTo} />
            <RateShort curFrom={curTo} curTo={curFrom} />
          </div>
        </DividedBlock>
        <CurrencySelect selected={curTo} onSelectCurrency={this.onSelectTo} />
      </AppComponent>
    );
  }
}

App.propTypes = {
  updateQuotations: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    quotations: state.get('Quotations').toJS()
  }),
  { updateQuotations }
)(App);

