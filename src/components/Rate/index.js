import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyChar, getCurrencyValue } from 'src/helpers';

import { RateComponent, Value, Equal, Currency } from './styled';

class Rate extends React.PureComponent {
  render() {
    const {
      curFrom, curTo, quotations, mini
    } = this.props;

    return (
      <RateComponent mini={mini}>
        <Value>
          <Currency mini={mini}>{getCurrencyChar(curFrom)}</Currency>
          <span>1</span>
        </Value>
        <Equal mini={mini}>=</Equal>
        <Value>
          <Currency mini={mini}>{getCurrencyChar(curTo)}</Currency>
          {
            quotations[curFrom] && quotations[curTo] ?
              <span>
                {getCurrencyValue(quotations[curFrom], quotations[curTo], mini ? 2 : 4)}
              </span> : null
          }
        </Value>
      </RateComponent>
    );
  }
}

Rate.propTypes = {
  quotations: PropTypes.object.isRequired,
  curFrom: PropTypes.string.isRequired,
  curTo: PropTypes.string.isRequired,
  mini: PropTypes.bool
};

Rate.defaultProps = {
  mini: false
};

export default connect((state) => ({
  quotations: state.get('Quotations').toJS()
}))(Rate);

