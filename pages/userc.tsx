import { FC } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/usercPageStyle'
import SideBar from '../components/sideBarComponent'
import UserBlock from '../components/userBlockComponent'

const Home: FC = () => {
  return (
    <>
      <MyHead title="User Controller" />
      <Style>
          <SideBar activePath='/userc' />
          <main>
              <form>
                  <input type='text' placeholder='username'/>
                  <input type='text' placeholder='username'/>
                  <input type='text' placeholder='username'/>
                  <input type='submit' value='adcionar'/>
              </form>
              <div className='content'>
                <UserBlock username='ryteck' firstname='Ryan' lastname='Martins' administrador={true} />
                <UserBlock username='ryteck' firstname='Ryan' lastname='Martins' administrador={false} />
              </div>
          </main>
      </Style>
    </>
  )
}

export default Home
