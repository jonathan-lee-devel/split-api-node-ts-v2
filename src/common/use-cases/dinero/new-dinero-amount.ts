import {NewDineroAmountFunction} from './types/new-dinero-amount';
import Dinero from 'dinero.js';

export const makeNewDineroAmount = (): NewDineroAmountFunction => {
  return function(amount: number) {
    // eslint-disable-next-line new-cap
    return Dinero({
      amount: Math.round(amount * 100),
      currency: 'EUR',
      precision: 2,
    });
  };
};
