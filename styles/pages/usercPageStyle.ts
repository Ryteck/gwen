import styled from 'styled-components'

const Style = styled.div`

width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: space-between;

main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
    form {
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      grid-gap: 20px;
      
      input {
        background: none;
        text-align: center;
        padding: 12px;
        border-radius: 20px;
        border: solid 2px;
        outline: none;
        transition: 0.25s;
      }
      
      input[type=text] {
        width: 150px;
        border-color: var(--color-primary-dark);
        box-shadow: 0 0 2px var(--color-primary-dark);
      
        :focus {
            border-color: var(--color-primary-pure);
            box-shadow: 0 0 100px var(--color-primary-pure);
        }
      }
      
      input[type=submit] {
        width: 100px;
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
    
    .content {
      width: 100%;
      height: 100%;
      margin-top: 100px;
      display: grid;
      grid-gap: 50px;
      overflow: auto;
      grid-template-columns: 1fr;
      scrollbar-width: none;
      -ms-overflow-style: none;
      ::-webkit-scrollbar {
        display: none;
      }
    }
}

`

export default Style
