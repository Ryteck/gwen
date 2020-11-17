import { FC, FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/usercPageStyle'
import SideBar from '../components/sideBarComponent'
import UserBlock from '../components/userBlockComponent'
import { toast } from 'react-toastify'
import axios from '../libs/axios'
import UserInterface from '../interfaces/userInterface'
import { use } from 'ast-types'

interface AxiosUsersIndexResponse {
    users: Array<UserInterface>;
    error?: any;
}

const UserControll: FC = () => {
  const [getUsers, setUsers] = useState<Array<UserInterface>>([])

  function add (e: FormEvent) {
    e.preventDefault()
  }

  function blockEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  async function loadUsers () {
    try {
      const { users } =
            await axios
              .post<AxiosUsersIndexResponse>('users/rest/')
              .then(({ data }) => {
                const { error } = data
                if (error) throw error
                return data
              })
              .catch(error => { throw error })

      setUsers(users)
    } catch (error) {
      toast.error(String(error))
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

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
                  {
                      getUsers.map(user => (
                          <UserBlock
                              key={user.id}
                              id={user.id}
                              username={user.username}
                              firstname={user.firstname}
                              lastname={user.lastname}
                              administrador={Boolean(user.administrador)} />
                      ))
                  }
              </div>
          </main>
      </Style>
    </>
  )
}

export default UserControll
