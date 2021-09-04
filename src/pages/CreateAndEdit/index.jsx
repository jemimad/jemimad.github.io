import React, {useState} from 'react';
import { TextField, InputAdornment, Paper, FormControl, InputLabel, Select, Typography, Grid, Button, IconButton, Box} from '@material-ui/core';
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { registerTrucker } from '../../store/actions';


const Form = ({truckers, dispatch}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [phone, setPhone] = useState();
  const [numberCnh, setNumberCnh] = useState();
  const [typeCnh, setTypeCnh] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addTrucker = () => {
    const trucker =  {
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
  }

  return (
    <>
    <Box style={{paddingTop: '50px'}}>
    <Typography variant="h6" style={{paddingBottom: "20px"}}>
          <IconButton href="/" size="medium"> <ArrowBackIcon/> </IconButton>
            Cadastro de Motoristas 
          </Typography>
    </Box>
    <Paper style={{padding: '0px 20px'}}>
      <Grid container spacing={2} direction="row" justifyContent="space-around" alignItems="center">
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} md={6} sm={4} >
              <TextField
              id="name"
              label="Nome completo"
              value={name ?? ''}
              onChange={(name) => setName(name.target.value)}
              margin="dense"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
          
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <KeyboardDatePicker
              variant="inline"
              format="dd/MM/yyyy"
              inputVariant="standard"
              margin="inherit"
              id="date-picker-inline"
              label="Data de Nascimento"
              value={selectedDate ?? null}
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
            value={phone ?? ''}
            onChange={(phone) => setPhone(phone.target.value)}
            margin="dense"
            color="secondary"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
              id="cpf"
              label="CPF"
              value={cpf ?? ""}
              onChange={(cpf) => setCpf(cpf.target.value)}
              margin="dense"
              color="secondary"
              variant="outlined"
              fullWidth
              InputProps={{
                  endAdornment: 
                  <InputAdornment position="start">
                      
                  </InputAdornment>,
              }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
              id="cnhNumber"
              label="Número da CNH"
              value={numberCnh ?? ""}
              onChange={(number) => setNumberCnh(number.target.value)}
              margin="dense"
              color="secondary"
              variant="outlined"
              fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" color="secondary" margin="dense" fullWidth>
              <InputLabel>Categoria da CNH</InputLabel>
              <Select
                native
                value={typeCnh ?? ''}
                onChange={(type) => setTypeCnh(type.target.value)}
                inputProps={{
                    name: 'cnhCategory',
                    id: 'outlined-cnhCategory-native-simple',
                }}
              >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" style={{paddingTop: 'inherit'}}>
        <Grid item>
          <Button variant="contained" color="primary" href="/" onClick={() => addTrucker()}>Cadastrar</Button>
        </Grid>
      </Grid>
        </Grid>
        </Paper>
    </>
  );
}

export default connect(state => ({ truckers: state.truckers }))(Form);