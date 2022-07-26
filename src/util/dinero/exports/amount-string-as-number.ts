import {AmountStringAsNumberFunction} from '../types/amount-string-as-number';

export const makeAmountStringAsNumber = (): AmountStringAsNumberFunction => {
  return function(amountString: string) {
    return Number(amountString
        .replace('€', '')
        .replace(',', ''),
    );
  };
};
