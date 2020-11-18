import { FC, FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/usercPageStyle'
import SideBar from '../components/sideBarComponent'
import UserBlock from '../components/userBlockComponent'
import { toast } from 'react-toastify'
import axios from '../libs/axios'
import UserInterface from '../interfaces/userInterface'
import Router from 'next/router'

interface AxiosUsersIndexResponse {
    users: Array<UserInterface>;
    error?: any;
}

const UserControll: FC = () => {
  const [getUsers, setUsers] = useState<Array<UserInterface>>([])
  const [getUsername, setUsername] = useState('')
  const [getFirstname, setFirstname] = useState('')
  const [getLastname, setLastname] = useState('')

  async function add (e: FormEvent) {
    e.preventDefault()
    try {
      const data = {
        username: getUsername,
        firstname: getFirstname,
        lastname: getLastname
      }
      await axios
        .post('users/rest/store', data)
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => { throw error })
      Router.reload()
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
          <SideBar
              activePath='/home'
              userType={sessionStorage.getItem('type')}
              firstname={sessionStorage.getItem('firstname')}
              lastname={sessionStorage.getItem('lastname')}
              avatar={sessionStorage.getItem('avatar')}
          />
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
