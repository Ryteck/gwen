import styled from 'styled-components'

const Style = styled.form`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
grid-gap: 20px;

h2 {
    text-transform: uppercase;
    font-weight: 200;
    font-size: 50px;
}

input {
    background: none;
    text-align: center;
    height: 40px;
    border-radius: 20px;
    border: solid 2px;
    outline: none;
    transition: 0.25s;
}

input[type=text], input[type=password] {
    width: 200px;
    border-color: var(--color-primary-dark);
    box-shadow: 0 0 2px var(--color-primary-dark);

    :focus {
        width: 225px;
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
        width: 125px;
        border-color: var(--color-secondary-pure);
        box-shadow: 0 0 100px var(--color-secondary-pure);
        background-color: var(--color-secondary-pure);
    }
}

`

export default Style
