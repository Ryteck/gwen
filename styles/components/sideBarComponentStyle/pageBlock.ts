import styled from 'styled-components'

const Style = styled.div`

width: 100%;
height: 30px;

div {
    width: 100%;
    height: 100%;
    border-radius: 0 20px 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 10px;
    
    span {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.enable {
    background-color: var(--color-primary-light);
    box-shadow: 0 0 2px var(--color-primary-light);
}

.disable {
    background-color: var(--color-primary-dark);
    box-shadow: 0 0 2px var(--color-primary-dark);
    transition: 0.25s;
    cursor: pointer;
    
    :hover {
        background-color: var(--color-primary-pure);
        box-shadow: 0 0 2px var(--color-primary-pure);
    }
}

`

export default Style
