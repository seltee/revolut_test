import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencyChar, getCurrencyValue } from 'src/helpers.js';

import 'scss/rate.scss';

class Rate extends React.PureComponent {
  render() {
    const { curFrom, curTo, quotations } = this.props;

    return (
      <div className="rate-component">
        <div>
          <span>{getCurrencyChar(curFrom)}</span>
          <span>1</span>
        </div>
        <div>=</div>
        <div>
          <span>{getCurrencyChar(curTo)}</span>
          {
            quotations[curFrom] && quotations[curTo] ?
              <span>{getCurrencyValue(quotations[curFrom], quotations[curTo])}</span> : null
          }
        </div>
      </div>
    );
  }
}

Rate.propTypes = {
  quotations: PropTypes.object.isRequired,
  curFrom: PropTypes.string.isRequired,
  curTo: PropTypes.string.isRequired
};

export default connect(
  (state) => ({
    quotations: state.get('Quotations').toJS()
  }),
  { }
)(Rate);

