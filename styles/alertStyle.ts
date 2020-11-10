import { createGlobalStyle } from 'styled-components'

const Alert = createGlobalStyle`

.swal-modal {
  input {
      background: none;
      height: 40px;
      border-radius: 20px;
      border: solid 2px;
      outline: none;
      transition: 0.25s;
      border-color: var(--color-secondary-dark);
      box-shadow: 0 0 2px var(--color-secondary-dark);
      color: var(--color-background-dark);
      text-align: center;
      ::placeholder {
        color: var(--color-background-dark);
    }
  }
}

`

export default Alert
