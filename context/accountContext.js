import { createContext, useReducer, useContext } from 'react';

const initialState = {
  isAddressOpen: false,
  addressData: {},
};

const AccountContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_ADDRESS':
      return {
        ...state,
        isAddressOpen: true,
        addressData: { ...action.payload },
      };
    case 'CLOSE_ADDRESS':
      return {
        ...state,
        isAddressOpen: false,
        addressData: {}
      };
    default:
      return state;
  }
};

export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AccountContext.Provider value={{ state, dispatch }}>{children}</AccountContext.Provider>;
};


export default AccountContext;
