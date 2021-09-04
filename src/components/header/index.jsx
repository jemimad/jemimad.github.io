import React from 'react';
import { AppBar, Toolbar, Box, Link } from '@material-ui/core';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import CreateButton from '../createButton';

const Header = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        > 
        <Box>
        <Link href="/" style={{ textDecoration: 'none', color: "white" }} >
          <Logo />
        </Link>
        </Box>
        <Box>
          <CreateButton /> 
        </Box>         
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)`
  max-height: 60px;
  z-index: 1299;
`;

const StyledToolbar = styled(Toolbar)`
  background-color: #e0e0e0;
  box-shadow: 0px 1px 10px 0px #000000;
`;


export default Header;
