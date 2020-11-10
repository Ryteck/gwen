import styled from 'styled-components'

const Style = styled.div`

display: flex;
align-items: center;
justify-content: center;

.block-container {
    width: 80%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 30px;
    border: solid 2px var(--color-contrast-pure);
    
    input {
        background: none;
        text-align: center;
        height: 40px;
        margin-left: 30px;
        border-radius: 20px;
        border: solid 2px;
        outline: none;
        transition: 0.25s;
        border: solid 2px var(--color-primary-pure);
        box-shadow: 0 0 2px var(--color-primary-pure);
        
        :focus {
          border: solid 2px var(--color-primary-light);
          box-shadow: 0 0 100px var(--color-primary-light);
        }
    }
    
    .admSwitch, .block-controlls {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .block-controlls {
      grid-gap: 20px;
      margin-right: 30px;
    }
        
    .iconSelect {
      cursor: pointer;
    }
}

`

export default Style
