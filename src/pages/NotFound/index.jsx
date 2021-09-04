import React from 'react';
import { Box, Container } from '@material-ui/core';
import {ReactComponent as Error404} from '../../assets/notfound.svg';

const NotFound = () => (
  <Container>
    <Box
      id="pageNotFoundArea"
      display="flex"
      style={{
        height: 'calc(100vh - 160px)',
      }}
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Error404 width="60%" height="50%" />
      <Box id="notFoundWarning" fontWeight="bold" fontSize={30} mt={5} mb={2}>
        Ops!
      </Box>
      <Box id="notFoundMessage" fontSize={20}>
        Parece que essa página não existe. Por favor, cheque se a URL está
        correta.
      </Box>
    </Box>
  </Container>
);

export default NotFound;