import Dinero from 'dinero.js';

export type NewDineroAmountFunction = (
    amount: number,
) => Dinero.Dinero;
