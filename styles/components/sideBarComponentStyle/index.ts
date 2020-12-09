import styled from 'styled-components'

const Style = styled.div`

width: 250px;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;

.side-header {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    
    .avatar {
      border-radius: 50%;
      object-fit: cover;
    }
    
    span {
      margin-top: 20px;
      font-size: 20px;
    }
}

.side-blocks {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  justify-content: initial;
  overflow-y: auto;
  margin-top: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
}

.side-footer {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-secondary-pure);
    border-radius: 0 0 20px 0;
    
    a {
        outline: none;
        text-decoration: none;
        color: var(--color-background-pure);
    }
}

`

export default Style
