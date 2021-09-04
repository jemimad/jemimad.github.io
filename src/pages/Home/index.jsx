import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { Container } from '@material-ui/core';
import List from '../../components/list';

function Home (){
    return (
      <>
        <Provider store={store}>
          <Container style={{padding: '50px 0px'}}>
            <List />
          </Container>
        </Provider>
      </>
    );
}

export default Home;