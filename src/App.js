import React from 'react';
import Header from './components/header';
import Routers from './routers'
import { Provider } from 'react-redux';
import store from './store/index.js';

class App extends React.Component {
  render (){
    return (
      <>
        <Provider store={store}>
          <Header />
          <Routers />
        </Provider>
      </>
    );
  }
}

export default App;