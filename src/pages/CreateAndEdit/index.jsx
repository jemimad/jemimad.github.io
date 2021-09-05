/* eslint-disable eqeqeq */
import React, {useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { TextField, InputAdornment, Typography, Grid, Button, IconButton, MenuItem} from '@material-ui/core';
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {ArrowBack, Person, Phone, AssignmentInd, Assignment } from '@material-ui/icons';
import { connect } from 'react-redux';
import { registerTrucker, editTrucker } from '../../store/actions';


const Form = ({truckers, dispatch}) => {
  const history = useHistory();
  const { id }  = useParams();
  const [selectedDate, setSelectedDate] = useState();
  // const [selectedTrucker, setSelectedTrucker] = useState([]);
  const [name, setName] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState();
  const [idTrucker, setIdTrucker] = useState();
  const [active, setActive] = useState();
  const [cpf, setCpf] = useState('');
  const [cpfErrorMessage, setCpfErrorMessage] = useState();
  const [phone, setPhone] = useState('');
  const [phoneErrorMessage, setPhoneErrorMessage] = useState();
  const [numberCnh, setNumberCnh] = useState('');
  const [numberCnhErrorMessage, setNumberCnhErrorMessage] = useState();
  const [typeCnh, setTypeCnh] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {

    async function selected(){
      var filterTrucker = truckers.filter((trucker) => trucker.id == id);
      setName(filterTrucker[0].name);
      setCpf(filterTrucker[0].cpf);
      setPhone(filterTrucker[0].phone);
      setSelectedDate(filterTrucker[0].birth_date);
      setNumberCnh(filterTrucker[0].cnh.number);
      setTypeCnh(filterTrucker[0].cnh.category);
      setIdTrucker(filterTrucker[0].id);
      setActive(filterTrucker[0].active);
    }

    if(id){
      selected();
    }
  }, [id, truckers]);

  const validate = () => {
    let isValid = true;

    if (!name) {
      setNameErrorMessage('Insira o nome completo');
      isValid = false;
    }

    if (!cpf) {
      setCpfErrorMessage('Insira o CPF');
      isValid = false;
    }

    if (!numberCnh) {
      setNumberCnhErrorMessage('Insira o número da CNH');
      isValid = false;
    }

    if(!phone){
      setPhoneErrorMessage('Insira o número de telefone');
      isValid = false;
    }

    return isValid;
  };

  const add = () => {
    if(validate()){
      const trucker =  {
        "id": truckers.length + 1,
        "active": true,
        "name": name,
        "phone": phone,
        "birth_date": selectedDate,
        "cpf": cpf,
        "cnh": {
          "number": numberCnh,
          "category": typeCnh,
        }     
      }
      dispatch(registerTrucker(trucker));
      history.push('/');
    }
  }

  const edit = () => {
    if(validate()){
      const trucker =  {
        "id": idTrucker,
        "active": active,
        "name": name,
        "phone": phone,
        "birth_date": selectedDate,
        "cpf": cpf,
        "cnh": {
          "number": numberCnh,
          "category": typeCnh,
        }     
      }
      dispatch(editTrucker(trucker));
      history.push('/');
    }
  }

  return (
    <>
    <Grid container style={{padding: '30px 30px'}}>
      <Grid item>
        <Typography variant="h6" style={{paddingBottom: "15px"}}>
          <IconButton style={{ paddingLeft: '0px'}} href="/" size="medium"> <ArrowBack/> </IconButton>
            {id ? 'Edição' : 'Cadastro'} de Motorista
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} md={6} sm={4} >
          <TextField
          id="name"
          label="Nome completo"
          value={name || ''}
          error={!!nameErrorMessage}
          helperText={nameErrorMessage}
          onChange={(value) => {
            setNameErrorMessage(undefined)
            setName(value.target.value)
          }}
          margin="dense"
          variant="outlined"
          color="secondary"
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end"><Person /></InputAdornment>,
          }}
        />
      </Grid> 
      <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <KeyboardDatePicker
            style={{margin: 'inherit'}}
            variant="inline"
            format="dd/MM/yyyy"
            inputVariant="standard"
            id="date-picker-inline"
            label="Data de Nascimento"
            value={selectedDate || null }
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider> 
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="phone"
          label="Telefone"
          error={!!phoneErrorMessage}
          helperText={phoneErrorMessage || 'Apenas números'}
          value={phone || ''}
          onChange={(value) => {
            setPhoneErrorMessage(undefined);
            setPhone(value.target.value);
          }}
          margin="dense"
          color="secondary"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end"><Phone /></InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
            id="cpf"
            label="CPF"
            value={cpf || ''}
            error={!!cpfErrorMessage}
            helperText={cpfErrorMessage || 'Apenas números'}
            onChange={(cpf) => {
              setCpfErrorMessage(undefined)
              setCpf(cpf.target.value)
            }}
            margin="dense"
            color="secondary"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end"><AssignmentInd /></InputAdornment>,
            }}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
            id="cnhNumber"
            label="Número da CNH"
            value={numberCnh || ''}
            onChange={(number) => {
              setNumberCnhErrorMessage(undefined)
              setNumberCnh(number.target.value)}}
            error={!!numberCnhErrorMessage}
            helperText={numberCnhErrorMessage}
            margin="dense"
            color="secondary"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end"><Assignment /></InputAdornment>,
            }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="standard-select-currency"
          select
          label="Categoria da CNH"
          value={typeCnh || ''}
          onChange={(type) => setTypeCnh(type.target.value)}
          fullWidth
        >
            <MenuItem value={'A'}>A</MenuItem>
            <MenuItem value={'B'}>B</MenuItem>
            <MenuItem value={'C'}>C</MenuItem>
            <MenuItem value={'D'}>D</MenuItem>
            <MenuItem value={'E'}>E</MenuItem>
            <MenuItem value={'AB'}>AB</MenuItem>
        </TextField>
      </Grid>
      <Grid item container justifyContent="flex-end" style={{paddingTop: 'inherit'}}>
        <Grid item>
            {id ? <Button variant="contained" color="primary" onClick={() => edit()}>Editar</Button> : <Button variant="contained" color="primary" onClick={() => add()}>Cadastrar</Button>}
          
        </Grid>
      </Grid>
      </Grid>
    </Grid>
    </>
  );
}



export default connect(state => ({ truckers: state.truckers }))(Form);