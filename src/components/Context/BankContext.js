import React, { createContext } from 'react';
import BankAPI from 'API/BankAPI';
const getBankContext = () => {
    const bankAPI = BankAPI();
    return bankAPI.data;
}
 export const BankContext = createContext(getBankContext);