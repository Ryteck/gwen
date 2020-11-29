import UserInterface from '../interfaces/userInterface'

const saveSession = (user: UserInterface, token: string): void => {
  const { id, username, firstname, lastname, avatar, administrador } = user

  sessionStorage.setItem('id', String(id))
  sessionStorage.setItem('username', username)
  sessionStorage.setItem('firstname', firstname)
  sessionStorage.setItem('lastname', lastname)
  sessionStorage.setItem('avatar', avatar)
  sessionStorage.setItem('administrador', String(administrador))
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('type', 'default')
}

const saveLocal = (user: UserInterface, token: string): void => {
  const { id, username, firstname, lastname, avatar, administrador } = user

  localStorage.setItem('id', String(id))
  localStorage.setItem('username', username)
  localStorage.setItem('firstname', firstname)
  localStorage.setItem('lastname', lastname)
  localStorage.setItem('avatar', avatar)
  localStorage.setItem('administrador', String(administrador))
  localStorage.setItem('token', token)
  localStorage.setItem('type', 'default')
}

const saveRootSession = (token: string): void => {
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('type', 'root')
}

const saveRootLocal = (token: string): void => {
  localStorage.setItem('token', token)
  localStorage.setItem('type', 'root')
}

const saveAll = (user: UserInterface, token: string): void => {
  saveSession(user, token)
  saveLocal(user, token)
}

const saveRootAll = (token: string): void => {
  saveRootSession(token)
  saveRootLocal(token)
}

const clearAll = (): void => {
  sessionStorage.clear()
  localStorage.clear()
}

const localToSession = (): void => {
  const type = localStorage.getItem('type')
  if (type !== 'root') {
    sessionStorage.setItem('id', localStorage.getItem('id'))
    sessionStorage.setItem('username', localStorage.getItem('username'))
    sessionStorage.setItem('firstname', localStorage.getItem('firstname'))
    sessionStorage.setItem('lastname', localStorage.getItem('lastname'))
    sessionStorage.setItem('avatar', localStorage.getItem('avatar'))
    sessionStorage.setItem('administrador', localStorage.getItem('administrador'))
  }
  sessionStorage.setItem('token', localStorage.getItem('token'))
  sessionStorage.setItem('type', type)
}

export default { saveSession, saveRootSession, saveAll, saveRootAll, clearAll, localToSession }
