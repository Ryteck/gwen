import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`

:root {
    --color-background-light: #F0F0F9;
    --color-background-pure: #F2EEDC;
    --color-background-dark: #151515;
    --color-primary-light: #FF299C;
    --color-primary-pure: #EF27A6;
    --color-primary-dark: #4C1A57;
    --color-secondary-light: #25D9FF;
    --color-secondary-pure: #357DED;
    --color-secondary-dark: #5438DC;
    --color-contrast-light: #CDFF00;
    --color-contrast-pure: #32E875;
    --color-contrast-dark: #137547;
}

* {
    color: var(--color-background-light);
    font-family: 'Dosis', 'Arial', 'sans-serif';
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ::placeholder {
        color: var(--color-background-light);
    }
}

html, body {
    height: 100vh;
}

body {
    background-color: var(--color-background-dark);
    display: flex;
    align-items: center;
    justify-content: center;
}

`

export default Global
