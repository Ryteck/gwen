import { FC, FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/perfilPageStyle'
import SideBar from '../components/sideBarComponent'
import Image from 'next/image'
import alertUtil from '../utils/alertUtil'
import { toast } from 'react-toastify'

const Perfil: FC = () => {
  const [getUsername, setUsername] = useState('')
  const [getFirstname, setFirstname] = useState('')
  const [getLastname, setLastname] = useState('')
  const [getNewPassword, setNewPassword] = useState('')
  const [getConfirmNewPassword, setConfirmNewPassword] = useState('')

  async function confirmPassword (): Promise<'cancel' | 'ok' | 'wrong'> {
    return await alertUtil
      .generateConfirmAlert()
      .then(value => {
        if (value === null) {
          return 'cancel'
        }
        return value === '123' ? 'ok' : 'wrong'
      }
      )
  }

  async function switchAvatar (e: FormEvent) {
    e.preventDefault()
    const confirm = await confirmPassword()

    switch (confirm) {
      case 'cancel':
        toast.warn('confirmação cancelada')
        break
      case 'ok':
        toast.success('senha correta')
        break
      case 'wrong':
        toast.error('senha incorreta')
        break
    }
  }

  async function saveChanges (e: FormEvent) {
    e.preventDefault()
    const confirm = await confirmPassword()

    switch (confirm) {
      case 'cancel':
        toast.warn('confirmação cancelada')
        break
      case 'ok':
        toast.success('senha correta')
        break
      case 'wrong':
        toast.error('senha incorreta')
        break
    }
  }

  async function switchPassword (e: FormEvent) {
    e.preventDefault()
    const confirm = await confirmPassword()

    switch (confirm) {
      case 'cancel':
        toast.warn('confirmação cancelada')
        break
      case 'ok':
        toast.success('senha correta')
        break
      case 'wrong':
        toast.error('senha incorreta')
        break
    }
  }

  function blockEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  useEffect(() => {
    if (sessionStorage) {
      setUsername(sessionStorage.getItem('username'))
      setFirstname(sessionStorage.getItem('firstname'))
      setLastname(sessionStorage.getItem('lastname'))
    }
  }, [])

  return (
    <>
      <MyHead title="Perfil" />
      <Style>
          <SideBar activePath='/perfil'/>
          <main>
              <form onSubmit={switchAvatar}>
                  <Image src='/default_avatar.jpg' width={100} height={100} className='avatar-prop'/>
                  <input type='submit' value='Alterar Imagem'/>
              </form>
              <form onSubmit={saveChanges}>
                  <input
                    type='text'
                    placeholder='username'
                    className='users-props'
                    onKeyDown={blockEnter}
                    value={getUsername}
                    onChange={e => setUsername(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='firstname'
                    className='users-props'
                    onKeyDown={blockEnter}
                    value={getFirstname}
                    onChange={e => setFirstname(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='lastname'
                    className='users-props'
                    onKeyDown={blockEnter}
                    value={getLastname}
                    onChange={e => setLastname(e.target.value)}
                  />
                  <input
                    type='submit'
                    value='Salvar Alterações'
                  />
              </form>
              <form onSubmit={switchPassword}>
                  <input
                    type='password'
                    placeholder='nova senha'
                    className='users-props'
                    onKeyDown={blockEnter}
                    value={getNewPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <input
                    type='password'
                    placeholder='confirmar nova senha'
                    className='users-props'
                    onKeyDown={blockEnter}
                    value={getConfirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                  />
                  <input
                    type='submit'
                    value='Trocar de senha'
                  />
              </form>
          </main>
      </Style>
    </>
  )
}

export default Perfil
