import styled from 'styled-components'

const Style = styled.div`

width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
grid-gap: 15px;

* {
    color: var(--color-background-light);
}

h1 {
    font-size: 250px;
    margin: 0;
    font-weight: 900;
    letter-spacing: 20px;
    background: url('/not-found.jpg') center no-repeat;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

input {
    background: none;
    text-align: center;
    height: 40px;
    border-radius: 20px;
    border: solid 2px;
    outline: none;
    transition: 0.25s;
    width: 200px;
    border-color: var(--color-secondary-dark);
    box-shadow: 0 0 2px var(--color-secondary-dark);
    cursor: pointer;

    :hover {
        width: 225px;
        border-color: var(--color-secondary-pure);
        box-shadow: 0 0 100px var(--color-secondary-pure);
        background-color: var(--color-secondary-pure);
    }
}

`

export default Style
