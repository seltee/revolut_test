import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyChar } from 'src/helpers';

import { CurrencyStatusComponent } from './styled';

class CurrencyStatus extends React.PureComponent {
  render() {
    const {
      balance, currency
    } = this.props;

    return (
      <CurrencyStatusComponent>
        <span>You have </span>
        <span>{getCurrencyChar(currency)}</span>
        <span>{balance.values[currency] ? balance.values[currency] : 0}</span>
      </CurrencyStatusComponent>
    );
  }
}

CurrencyStatus.propTypes = {
  currency: PropTypes.string.isRequired,
  balance: PropTypes.object.isRequired
};

export default connect((state) => ({
  balance: state.get('Balance').toJS()
}))(CurrencyStatus);

