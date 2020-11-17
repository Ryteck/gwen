import { FC, FormEvent, KeyboardEvent } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/perfilPageStyle'
import SideBar from '../components/sideBarComponent'
import Image from 'next/image'
import alertUtil from '../utils/alertUtil'
import { toast } from 'react-toastify'

const Perfil: FC = () => {
  async function confirmPassword (): Promise<boolean> {
    return await alertUtil
      .generateConfirmAlert()
      .then(value => value === '123')
  }

  async function switchAvatar (e: FormEvent) {
    e.preventDefault()
    if (await confirmPassword()) {
      toast.success('senha correta')
    } else {
      toast.error('senha incorreta')
    }
  }

  async function saveChanges (e: FormEvent) {
    e.preventDefault()
    if (await confirmPassword()) {
      toast.success('senha correta')
    } else {
      toast.error('senha incorreta')
    }
  }

  async function switchPassword (e: FormEvent) {
    e.preventDefault()
    if (await confirmPassword()) {
      toast.success('senha correta')
    } else {
      toast.error('senha incorreta')
    }
  }

  function blockEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  return (
    <>
      <MyHead title="Perfil" />
      <Style>
          <SideBar activePath='/perfil' />
          <main>
              <form onSubmit={switchAvatar}>
                  <Image src='/default_avatar.jpg' width={100} height={100} className='avatar-prop'/>
                  <input type='submit' value='Alterar Imagem'/>
              </form>
              <form onSubmit={saveChanges}>
                  <input type='text' placeholder='username' className='users-props' onKeyDown={blockEnter}/>
                  <input type='text' placeholder='firstname' className='users-props' onKeyDown={blockEnter}/>
                  <input type='text' placeholder='lastname' className='users-props' onKeyDown={blockEnter}/>
                  <input type='submit' value='Salvar Alterações'/>
              </form>
              <form onSubmit={switchPassword}>
                  <input type='password' placeholder='nova senha' className='users-props' onKeyDown={blockEnter}/>
                  <input type='password' placeholder='confirmar nova senha' className='users-props' onKeyDown={blockEnter}/>
                  <input type='submit' value='Trocar de senha'/>
              </form>
          </main>
      </Style>
    </>
  )
}

export default Perfil
