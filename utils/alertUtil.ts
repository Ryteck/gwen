import swal from 'sweetalert'

const generateConfirmAlert = (): Promise<any> => {
  return swal({
    title: 'Confirme a sua senha',
    text: 'Digite a sua senha para concluir esta ação',
    content: {
      element: 'input',
      attributes: {
        type: 'password',
        placeholder: 'Digite a sua senha'
      }
    },
    icon: 'info',
    buttons: {
      cancel: true,
      confirm: true
    }
  })
}

export default { generateConfirmAlert }
