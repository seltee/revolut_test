import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CurrenciesComponent, Currency } from './styled';

class CurrencySelect extends React.PureComponent {
  render() {
    const { currencies, selected, onSelectCurrency } = this.props;

    return (
      <CurrenciesComponent>
        {
          currencies.map((element) => (
            <Currency
              selected={element === selected}
              onClick={() => onSelectCurrency(element)}
              onKeyPress={() => onSelectCurrency(element)}
              role="button"
              tabIndex={0}
              key={element}
            >
              {element}
            </Currency>
          ))
        }
      </CurrenciesComponent>
    );
  }
}

CurrencySelect.propTypes = {
  selected: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCurrency: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    currencies: state.get('Balance').get('preferred').toJS()
  }),
  { }
)(CurrencySelect);

