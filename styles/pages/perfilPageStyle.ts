import styled from 'styled-components'

const Style = styled.div`

width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: space-between;

main {
    width: 100%;
    display: flex;
    grid-gap: 25px;
    align-items: center;
    justify-content: center;
    
    form {
      display: flex;
      flex-direction: column;
      grid-gap: 20px;
      align-items: center;
      justify-content: center;
      
      .avatar-prop {
          border-radius: 50%;
          object-fit: cover;
      }
      
      input {
        background: none;
        text-align: center;
        width: 150px;
        padding: 12px;
        border-radius: 20px;
        border: solid 2px;
        outline: none;
        transition: 0.25s;
      }
      
      input.users-props {
        border-color: var(--color-primary-dark);
        box-shadow: 0 0 2px var(--color-primary-dark);
    
        :focus {
            border-color: var(--color-primary-pure);
            box-shadow: 0 0 100px var(--color-primary-pure);
        }
      }
      
      input[type=submit] {
        border-color: var(--color-secondary-dark);
        box-shadow: 0 0 2px var(--color-secondary-dark);
        cursor: pointer;

        :hover {
            border-color: var(--color-secondary-pure);
            box-shadow: 0 0 100px var(--color-secondary-pure);
            background-color: var(--color-secondary-pure);
        }
      }
    }
}

`

export default Style
