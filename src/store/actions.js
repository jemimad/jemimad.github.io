export function registerTrucker(trucker){
    return {
      type: 'REGISTER_TRUCKER',
      trucker,
    }
}

export function activeTrucker(active, cpf){
    return {
      type: 'ACTIVE_TRUCKER',
      active,
      cpf,
    }
  }
  
export function removeTrucker(cpf){
    return {
      type: 'REMOVE_TRUCKER',
      cpf,
    }
}

export function editTrucker(trucker){
  return {
    type: 'EDIT_TRUCKER',
    trucker,
  }
}