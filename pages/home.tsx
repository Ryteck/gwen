import { FC } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/homePageStyle'
import SideBar from '../components/sideBarComponent'

const Home: FC = () => {
  return (
    <>
      <MyHead title="Home" />
      <Style>
          <SideBar activePath='/home'/>
          <main>
              Home
          </main>
      </Style>
    </>
  )
}

export default Home
