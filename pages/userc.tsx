import { FC, FormEvent, KeyboardEvent } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/usercPageStyle'
import SideBar from '../components/sideBarComponent'
import UserBlock from '../components/userBlockComponent'

const Home: FC = () => {
  function add (e: FormEvent) {
    e.preventDefault()
  }

  function blockEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  return (
    <>
      <MyHead title="User Controller" />
      <Style>
          <SideBar activePath='/userc' />
          <main>
              <form onSubmit={add}>
                  <input type='text' placeholder='username' onKeyDown={blockEnter}/>
                  <input type='text' placeholder='username' onKeyDown={blockEnter}/>
                  <input type='text' placeholder='username' onKeyDown={blockEnter}/>
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
