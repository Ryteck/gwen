import { FC, useEffect, useState } from 'react'
import Style from '../../styles/components/sideBarComponentStyle'
import Image from 'next/image'
import PageBlock from './pageBlock'
import Reload from './reload'

interface PageFormat {
    title: string;
    path: string;
}

const defaultPages: Array<PageFormat> = [
  { title: 'Home', path: '/home' },
  { title: 'Disconnect', path: '/disconnect' }
]

const lowPages: Array<PageFormat> = [
  { title: 'Perfil', path: '/perfil' }
]

const highPages: Array<PageFormat> = [
  { title: 'User Controll', path: '/userc' }
]

interface SideBarProps {
    activePath: string;
}

const SideBar: FC<SideBarProps> = props => {
  const { activePath } = props

  const [getUserType, setUserType] = useState('')
  const [getAvatar, setAvatar] = useState('')
  const [getFirstname, setFirstname] = useState('')
  const [getLastname, setLastname] = useState('')

  function getPageBlocksMenu (): Array<PageFormat> {
    let pages = []
    pages = pages.concat(defaultPages)
    pages = pages.concat(lowPages)
    pages = pages.concat(highPages)
    return pages
  }

  function getAvatarUrl (): string {
    return `/${getAvatar}`
  }

  function getFullName (): string {
    return `${getFirstname} ${getLastname}`
  }

  function getHeaderSideBar () {
    return (
          <div className='side-header'>
              <Image src={getAvatarUrl()} width={200} height={200} className='avatar'/>
              <span>
                    {
                        getFullName()
                    }
                </span>
          </div>
    )
  }

  useEffect(() => {
    if (sessionStorage) {
      setUserType(sessionStorage.getItem('type'))
      setAvatar(sessionStorage.getItem('avatar'))
      setFirstname(sessionStorage.getItem('firstname'))
      setLastname(sessionStorage.getItem('lastname'))
    }
  }, [])

  return (
      <>
        <Reload />
        <Style>
            {
                getUserType !== 'root' ? getHeaderSideBar() : null
            }
            <div className='side-blocks'>
                {
                    getPageBlocksMenu().map(pageBlock => {
                      const { title, path } = pageBlock
                      return <PageBlock title={title} path={path} active={activePath === path} key={title} />
                    })
                }
            </div>
            <div className='side-footer'>
                <a target='_blank' href='/license.html'>MIT</a>
            </div>
        </Style>
      </>
  )
}

export default SideBar
