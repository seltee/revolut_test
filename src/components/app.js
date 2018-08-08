import React from 'react';
import PropTypes from 'prop-types';
import Currency from 'src/components/currency';
import Rate from 'src/components/rate';
import { updateQuotations } from 'src/actions/quotationsActions';
import { convertCurrency } from 'src/helpers';

import { connect } from 'react-redux';

import 'scss/app.scss';

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

  componentDidMount() {
    this.props.updateQuotations();
    this.interval = setInterval(() => {
      this.props.updateQuotations();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

  render() {
    const {
      curFrom, curTo, valFrom, valTo
    } = this.state;

    return (
      <div className="app-component">
        <Rate curFrom={curFrom} curTo={curTo} />
        <div className="border" />
        <Currency
          currency={curFrom}
          value={valFrom}
          onChange={this.changeFrom}
          onSelectCurrency={this.onSelectFrom}
        />
        <div className="border" />
        <Currency
          currency={curTo}
          value={valTo}
          onChange={this.changeTo}
          onSelectCurrency={this.onSelectTo}
          compTo={curFrom}
        />
      </div>
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

