import { FC, FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/perfilPageStyle'
import SideBar from '../components/sideBarComponent'
import Image from 'next/image'
import alertUtil from '../utils/alertUtil'
import { toast } from 'react-toastify'
import api from '../libs/api'

const Perfil: FC = () => {
  const [getUsername, setUsername] = useState('')
  const [getFirstname, setFirstname] = useState('')
  const [getLastname, setLastname] = useState('')
  const [getNewPassword, setNewPassword] = useState('')
  const [getConfirmNewPassword, setConfirmNewPassword] = useState('')

  async function confirmPassword (): Promise<'cancel' | 'ok' | 'wrong'> {
    const login = async value => {
      try {
        const data = {
          username: sessionStorage.getItem('username'),
          password: value
        }
        await api
          .post('users/auth/login', data)
          .then(({ data }) => {
            const { error } = data
            if (error) throw error
            return data
          })
          .catch(error => { throw error })
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }

    return await alertUtil
      .generateConfirmAlert()
      .then(async value => {
        if (value === null) {
          return 'cancel'
        }
        return await login(value) ? 'ok' : 'wrong'
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
        try {
          const data = {
            username: getUsername,
            firstname: getFirstname,
            lastname: getLastname
          }
          await api
            .put(`users/rest/update/${sessionStorage.getItem('id')}`, data)
            .then(({ data }) => {
              const { error } = data
              if (error) throw error
            })
            .catch(error => { throw error })
          sessionStorage.setItem('username', getUsername)
          sessionStorage.setItem('firstname', getFirstname)
          sessionStorage.setItem('lastname', getLastname)
          const type = localStorage.getItem('type')
          if (type) {
            localStorage.setItem('username', getUsername)
            localStorage.setItem('firstname', getFirstname)
            localStorage.setItem('lastname', getLastname)
          }
          toast.info('Usuário alterado')
        } catch (error) {
          toast.error(String(error))
        }
        break
      case 'wrong':
        toast.error('senha incorreta')
        break
    }
  }

  async function switchPassword (e: FormEvent) {
    e.preventDefault()

    if (getNewPassword === '') {
      return toast.error('primeiro campo vazio')
    }

    if (getConfirmNewPassword === '') {
      return toast.error('segundo campo vazio')
    }

    if (getNewPassword !== getConfirmNewPassword) {
      return toast.error('senhas não correspondem')
    }

    const confirm = await confirmPassword()

    switch (confirm) {
      case 'cancel':
        toast.warn('confirmação cancelada')
        break
      case 'ok':
        try {
          const data = {
            password: getNewPassword
          }
          await api
            .put(`users/patch/changePassword/${sessionStorage.getItem('id')}`, data)
            .then(({ data }) => {
              const { error } = data
              if (error) throw error
            })
            .catch(error => { throw error })
          toast.info('senha alterada')
        } catch (error) {
          toast.error(String(error))
        }
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
