import { FC, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CheckBox from '../components/checkBoxComponent'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/indexPageStyle'
import axios from '../libs/axios'
import { toast } from 'react-toastify'
import UserInterface from '../interfaces/userInterface'
import authHelper from '../helpers/authHelper'

interface AxiosLoginResponse {
  token: string;
  user: UserInterface;
  error?: any;
}

const Index: FC = () => {
  const [getUsername, setUsername] = useState('')
  const [getPassword, setPassword] = useState('')
  const [getLongTime, setLongTime] = useState(false)

  const router = useRouter()

  async function goToHome (e: FormEvent) {
    e.preventDefault()
    try {
      const data = {
        username: getUsername,
        password: getPassword,
        high: getLongTime
      }
      const { token, user } =
          await axios
            .post<AxiosLoginResponse>('users/auth/login', data)
            .then(({ data }) => {
              const { error } = data
              if (error) throw error
              return data
            })
            .catch(error => { throw error })

      if (getUsername === 'root') {
        getLongTime ? authHelper.saveRootAll(token) : authHelper.saveRootSession(token)
      } else {
        getLongTime ? authHelper.saveAll(user, token) : authHelper.saveSession(user, token)
      }

      router.push('/home')
    } catch (error) {
      toast.error(String(error))
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem('type')) {
      if (!localStorage.getItem('type')) {
        return
      }
    }
    router.push('/home')
  }, [])

  return (
    <>
      <MyHead title="Login" />
      <Style onSubmit={goToHome}>
        <h2>
          login
        </h2>
        <input
          type="text"
          placeholder="username"
          value={getUsername}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={getPassword}
          onChange={e => setPassword(e.target.value)}
        />
        <CheckBox
          question="manter conectado ?"
          getValue={getLongTime}
          setValue={setLongTime}
        />
        <input
          type="submit"
          value="Logar"
        />
      </Style>
    </>
  )
}

export default Index
