import React from 'react';
import { Link, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function CreateButton() {

  return (
    <>
      <Link style={{ textDecoration: 'none'}} href="/create">
        <Button style={{ color: 'black', backgroundColor: '#f2cf1d'}}variant="contained" startIcon={<AddIcon/>}>  Cadastrar </Button>
      </Link>    
    </>
  );
}