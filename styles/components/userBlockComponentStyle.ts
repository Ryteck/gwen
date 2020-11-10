import styled from 'styled-components'

const Style = styled.div`

display: flex;
align-items: center;
justify-content: center;

.block-container {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    input {
        background: none;
        text-align: center;
        height: 40px;
        border-radius: 20px;
        border: solid 2px;
        outline: none;
        transition: 0.25s;
    }
    
    .iconSelect {
      cursor: pointer;
    }
}

`

export default Style
