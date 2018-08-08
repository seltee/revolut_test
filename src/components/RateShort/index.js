import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyChar, getCurrencyValue } from 'src/helpers';

import { RateComponent, Value, Equal, Currency } from './styled';

class RateShort extends React.PureComponent {
  render() {
    const { curFrom, curTo, quotations } = this.props;

    return (
      <RateComponent>
        <Value>
          <Currency>{getCurrencyChar(curFrom)}</Currency>
          <span>1</span>
        </Value>
        <Equal>=</Equal>
        <Value>
          <Currency>{getCurrencyChar(curTo)}</Currency>
          {
            quotations[curFrom] && quotations[curTo] ?
              <span>{getCurrencyValue(quotations[curFrom], quotations[curTo], 2)}</span> : null
          }
        </Value>
      </RateComponent>
    );
  }
}

RateShort.propTypes = {
  quotations: PropTypes.object.isRequired,
  curFrom: PropTypes.string.isRequired,
  curTo: PropTypes.string.isRequired
};

export default connect(
  (state) => ({
    quotations: state.get('Quotations').toJS()
  }),
  { }
)(RateShort);

