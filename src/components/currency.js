import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencyChar, getCurrencyValue } from 'src/helpers';

import 'scss/currency.scss';

class Currency extends React.PureComponent {
  render() {
    const {
      currency, value, balance, quotations, compTo, onChange, onSelectCurrency
    } = this.props;

    return (
      <div className="currency-component">
        <div className="currency">
          <div>{this.props.currency}</div>
          <div>
            <span>You have </span>
            <span className="currency-char">{getCurrencyChar(currency)}</span>
            <span>{balance.values[currency] ? balance.values[currency] : 0}</span>
          </div>
        </div>
        <div className="value">
          <input value={value} onChange={onChange} onFocus={onChange} />
          {
            compTo ?
              <div>
                <span className="currency-char">{getCurrencyChar(currency)}</span>
                <span>1 = </span>
                <span className="currency-char">{getCurrencyChar(compTo)}</span>
                <span>{getCurrencyValue(quotations[currency], quotations[compTo], 2)}</span>
              </div> : null
          }

        </div>
        <div className="currencies">
          {
            balance.preferred.map((element) => (
              <div
                className={element === currency ? 'selected' : null}
                onClick={() => onSelectCurrency(element)}
                onKeyPress={() => onSelectCurrency(element)}
                role="button"
                tabIndex={0}
                key={element}
              >
                {element}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Currency.propTypes = {
  currency: PropTypes.string.isRequired,
  compTo: PropTypes.string,
  value: PropTypes.string.isRequired,
  balance: PropTypes.object.isRequired,
  quotations: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelectCurrency: PropTypes.func.isRequired
};

Currency.defaultProps = {
  compTo: null
};

export default connect(
  (state) => ({
    balance: state.get('Balance').toJS(),
    quotations: state.get('Quotations').toJS()
  }),
  { }
)(Currency);

