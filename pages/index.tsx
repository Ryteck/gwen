import { FC, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import CheckBox from '../components/checkBoxComponent'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/indexPageStyle'

const Index: FC = () => {
  const [getUsername, setUsername] = useState('')
  const [getPassword, setPassword] = useState('')
  const [getLongTime, setLongTime] = useState(false)

  const router = useRouter()

  function goToHome (e: FormEvent) {
    e.preventDefault()
    router.push('/home')
  }

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
