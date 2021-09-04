import { createStore } from 'redux';
import data from '../data/db.json'

const localStorageState = localStorage.getItem('state');
const INITIAL_STATE = localStorageState ? JSON.parse(localStorageState) : { truckers: data };

function reducer(state = INITIAL_STATE, action){
    var stateTemp = {};
    if(action.type === 'ACTIVE_TRUCKER'){
        stateTemp = {...state, truckers: state.truckers.map(trucker => {
            if (trucker.cpf !== action.cpf) {
              return trucker
            }
  
            return {
              ...trucker,
              active: !trucker.active
            }
          })
        }

        localStorage.setItem('state', JSON.stringify(stateTemp));
        return stateTemp;

    }else if(action.type === 'REMOVE_TRUCKER'){

        stateTemp = {
            ...state,
            truckers: state.truckers.filter( trucker => trucker.cpf !== action.cpf )
        };
        localStorage.setItem('state', JSON.stringify(stateTemp));
        return stateTemp;

    }else if(action.type === 'REGISTER_TRUCKER'){

      stateTemp = {
        ...state,
        truckers: [
            ...state.truckers,
            action.trucker
        ]
      };
      localStorage.setItem('state', JSON.stringify(stateTemp));
      return stateTemp;

    }else if(action.type === 'EDIT_TRUCKER'){

      stateTemp = {...state, truckers: state.truckers.map(trucker => {
        if (trucker.cpf !== action.cpf) {
          return trucker
        }

        return {
          ...trucker,
          truckers: action.trucker,
        }
      })
    }

    localStorage.setItem('state', JSON.stringify(stateTemp));
    return stateTemp;
    }
    
    return state;
}

const store = createStore(reducer);

export default store;