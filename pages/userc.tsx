import { FC, FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/usercPageStyle'
import SideBar from '../components/sideBarComponent'
import UserBlock from '../components/userBlockComponent'
import { toast } from 'react-toastify'
import api from '../libs/api'
import UserInterface from '../interfaces/userInterface'

interface ApiUsersIndexResponse {
    users: Array<UserInterface>;
    error?: any;
}

const UserControll: FC = () => {
  const [getUsers, setUsers] = useState<Array<UserInterface>>([])
  const [getUsername, setUsername] = useState('')
  const [getFirstname, setFirstname] = useState('')
  const [getLastname, setLastname] = useState('')

  async function loadUsers () {
    try {
      const { users } =
            await api
              .post<ApiUsersIndexResponse>('users/rest/')
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

  async function add (e: FormEvent) {
    e.preventDefault()
    try {
      const data = {
        username: getUsername,
        firstname: getFirstname,
        lastname: getLastname
      }
      await api
        .post('users/rest/store', data)
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => { throw error })
      loadUsers()
    } catch (error) {
      toast.error(String(error))
    }
  }

  function blockEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <>
      <MyHead title="User Controller" />
      <Style>
          <SideBar activePath='/userc'/>
          <main>
              <form onSubmit={add}>
                  <input
                      type='text'
                      placeholder='username'
                      onKeyDown={blockEnter}
                      value={getUsername}
                      onChange={e => setUsername(e.target.value)}
                  />
                  <input
                      type='text'
                      placeholder='firstname'
                      onKeyDown={blockEnter}
                      value={getFirstname}
                      onChange={e => setFirstname(e.target.value)}
                  />
                  <input
                      type='text'
                      placeholder='lastname'
                      onKeyDown={blockEnter}
                      value={getLastname}
                      onChange={e => setLastname(e.target.value)}
                  />
                  <input type='submit' value='adcionar'/>
              </form>
              <div className='content'>
                  {
                      getUsers.map(user => {
                        if (user.username !== sessionStorage.getItem('username')) {
                          return (
                                  <UserBlock
                                      key={user.id}
                                      id={user.id}
                                      username={user.username}
                                      firstname={user.firstname}
                                      lastname={user.lastname}
                                      administrador={Boolean(user.administrador)}
                                  />
                          )
                        } else {
                          return null
                        }
                      })
                  }
              </div>
          </main>
      </Style>
    </>
  )
}

export default UserControll
