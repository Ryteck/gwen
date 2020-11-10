import { FC } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/disconnectPageStyle'
import SideBar from '../components/sideBarComponent'
import { useRouter } from 'next/router'

const Home: FC = () => {
  const router = useRouter()

  function handleExit () {
    sessionStorage.clear()
    router.push('/')
  }

  return (
    <>
      <MyHead title="Disconnect" />
      <Style>
          <SideBar activePath='/disconnect' />
          <main>
              <input type='button' value='Sair' onClick={handleExit}/>
          </main>
      </Style>
    </>
  )
}

export default Home
