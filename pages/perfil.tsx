import { FC } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/perfilPageStyle'
import SideBar from '../components/sideBarComponent'

const Home: FC = () => {
  return (
    <>
      <MyHead title="Perfil" />
      <Style>
          <SideBar activePath='/perfil' />
          <main>
              Perfil
          </main>
      </Style>
    </>
  )
}

export default Home
