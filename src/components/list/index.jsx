import React, {useState} from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, Divider, Typography, Chip, Button, Dialog,
DialogActions, DialogContent, DialogContentText, Box, Link } from '@material-ui/core';
import { connect } from 'react-redux';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import moment from 'moment';
import 'moment/locale/pt-br';
import { maskCpf } from '../../utils';
import { ReactComponent as Confirm } from '../../assets/confirmed.svg';
import { ReactComponent as Profile } from '../../assets/avatar.svg';
import { ReactComponent as AddTrucker } from '../../assets/add.svg';
import styled from 'styled-components';
import { activeTrucker, removeTrucker } from '../../store/actions';


const List = ({truckers, dispatch}) => {
  const [open, setOpen] = useState(false);
  const [cpfTruckRemove, setCpfTruckRemove] = useState();

  const openDialog = (cpf) => {
    setCpfTruckRemove(cpf);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () =>{
    dispatch(removeTrucker(cpfTruckRemove))
    setOpen(false);
  }

  return (
    <>
    {truckers.length > 0 ? (
    <>
    <Grid container direction="row" justifyContent="center">
    {truckers.map((trucker) => 
      <Grid item key={trucker.id}>
      <Card style={{width: '350px', margin: '0px 16px 16px 0'}} raised>
      <CardHeader
        title={
          <Typography variant="h6">
            {trucker.name}
        </Typography>
        }
        action={
              <Chip
                size="small"
                label={trucker.active ? 'Ativo' : 'Inativo'}
                color={trucker.active ? 'primary' : 'secondary'}
                onClick={() => dispatch(activeTrucker(!trucker.active, trucker.cpf))}
                icon={trucker.active ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/> } /> }
        avatar={
         <Profile width="50px"
         height= '50px' />
        }
      />
      <Divider />
      <CardContent>
        <Typography variant="body2">
          <Info>CPF</Info>: {maskCpf(trucker.cpf)}
        </Typography>
        <Typography variant="body2">
          <Info>Data de Nascimento</Info>: {moment(trucker.birth_date).format('L')}
        </Typography>
        <Typography variant="body2">
          <Info>Telefone</Info>: {trucker.phone}
        </Typography>
        <Typography variant="body2">
            <Info>Tipo da CNH</Info>: {trucker.cnh.category}
        </Typography>
        <Typography variant="body2">
         <Info> Número da CNH</Info>: {trucker.cnh.number}
        </Typography>
      </CardContent>
        <CardActions style={{justifyContent: 'flex-end'}}>
          <Button variant="outlined" color="primary" onClick= {() => openDialog(trucker.cpf)}size="small">Remover</Button>
          <Button variant="contained" color="primary" size="small">Editar</Button>
        </CardActions>
      </Card>
      </Grid>
    )}
    </Grid>
     </>
     ): 
     <>
     <Box display="flex" alignItems="center" flexDirection="column">
        <AddTrucker width="60%" height="50%" />
       <Typography>Não temos nenhum motorista cadastrado. Que tal cadastrar algum clicando <Link href="/create"> aqui</Link>?</Typography>
     </Box>
      </> }

    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
      <StyledConfirm />
      <DialogContentText style={{textAlign: 'center'}}>Esta ação não poderá ser desfeita. Tem certeza que deseja excluir esse motorista? </DialogContentText>
      </DialogContent>
      <DialogActions style={{textAlign: 'center', paddingBottom: '10px'}}>
        <Button variant="outlined" onClick={handleClose} >
          Não
        </Button>
        <Button color="primary" onClick={handleRemove} variant="contained">
          Sim, tenho certeza
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

const StyledConfirm = styled(Confirm)`
  display: flex;
  height: 50%;
  width: 50%;
  margin: auto;
  padding-bottom: 15px;
`;

const Info = styled.span`
  font-weight: bold;
`;

export default connect(state => ({ truckers: state.truckers }))(List);
