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
    align-items: center;
    justify-content: center;
    
    input {
        background: none;
        text-align: center;
        height: 40px;
        border-radius: 20px;
        border: solid 2px;
        outline: none;
        transition: 0.25s;
        width: 100px;
        border-color: var(--color-secondary-dark);
        box-shadow: 0 0 2px var(--color-secondary-dark);
        cursor: pointer;
    
        :hover {
            width: 125px;
            border-color: var(--color-secondary-pure);
            box-shadow: 0 0 100px var(--color-secondary-pure);
            background-color: var(--color-secondary-pure);
        }
    }
}

`

export default Style
