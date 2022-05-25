import { createContext, useReducer, useContext } from 'react';
import data from '../data/data.json';

const initialState = data.purposes.filter((p) => p.required).map((x) => x.id);
const firstState = data.purposes.filter((p) => p.required || data.legalInterest.includes(p.id)).map((x) => x.id);

const ConsentContext = createContext();

const consentReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      if (Array.isArray(action.id)) {
        return [...state, ...action.id];
      }
      return [...state, action.id];
    }
    case 'remove': {
      if (Array.isArray(action.id)) {
        return state.filter((x) => !action.id.includes(x));
      }
      return state.filter((x) => x !== action.id);
    }
    case 'remove-all': {
      return state.filter((x) => initialState.includes(x));
    }
    case 'add-all': {
      return data.purposes.map((p) => p.id).concat(data.partners.map((p)=>p.id));
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const ConsentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(consentReducer, firstState);

  const value = { state, dispatch };
  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
};

const useConsentContext = () => {
  return useContext(ConsentContext);
};

export { useConsentContext };

export default ConsentProvider;
