import { FC, FormEvent, useState } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/perfilPageStyle'
import SideBar from '../components/sideBarComponent'
import Image from 'next/image'

const Home: FC = () => {
  const [getPassword1, setPassword1] = useState('')
  const [getPassword2, setPassword2] = useState('')
  const [getPassword3, setPassword3] = useState('')

  async function switchAvatar (e: FormEvent) {
    e.preventDefault()
  }

  async function saveChanges (e: FormEvent) {
    e.preventDefault()
  }

  async function switchPassword (e: FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <MyHead title="Perfil" />
      <Style>
          <SideBar activePath='/perfil' />
          <main>
              <form onSubmit={switchAvatar}>
                  <Image src='/default_avatar.jpg' width={100} height={100} className='avatar-prop'/>
                  <input type='password' placeholder='senha' className='password-confirm' value={getPassword1} onChange={e => setPassword1(e.target.value)}/>
                  <input type='submit' value='Alterar Imagem'/>
              </form>
              <form onSubmit={saveChanges}>
                  <input type='text' placeholder='username' className='users-props'/>
                  <input type='text' placeholder='firstname' className='users-props'/>
                  <input type='text' placeholder='lastname' className='users-props'/>
                  <input type='password' placeholder='senha' className='password-confirm' value={getPassword2} onChange={e => setPassword2(e.target.value)}/>
                  <input type='submit' value='Salvar Alterações'/>
              </form>
              <form onSubmit={switchPassword}>
                  <input type='password' placeholder='nova senha' className='users-props'/>
                  <input type='password' placeholder='confirmar nova senha' className='users-props'/>
                  <input type='password' placeholder='senha' className='password-confirm' value={getPassword3} onChange={e => setPassword3(e.target.value)}/>
                  <input type='submit' value='Trocar de senha'/>
              </form>
          </main>
      </Style>
    </>
  )
}

export default Home
