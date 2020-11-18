import { FC } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/disconnectPageStyle'
import SideBar from '../components/sideBarComponent'
import { useRouter } from 'next/router'
import authHelper from '../helpers/authHelper'

const Disconnect: FC = () => {
  const router = useRouter()

  function handleExit () {
    authHelper.clearAll()
    router.push('/')
  }

  return (
    <>
      <MyHead title="Disconnect" />
      <Style>
          <SideBar
              activePath='/home'
              userType={sessionStorage.getItem('type')}
              firstname={sessionStorage.getItem('firstname')}
              lastname={sessionStorage.getItem('lastname')}
              avatar={sessionStorage.getItem('avatar')}
          />
          <main>
              <input type='button' value='Sair' onClick={handleExit}/>
          </main>
      </Style>
    </>
  )
}

export default Disconnect
