import { FC } from 'react'
import Style from '../../styles/components/sideBarComponentStyle'
import Image from 'next/image'
import PageBlock from './pageBlock'
import Reload from '../reloadComponent'

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
    userType: string;
    avatar?: string;
    firstname?: string;
    lastname?: string;
}

const SideBar: FC<SideBarProps> = props => {
  const { activePath, userType, avatar, firstname, lastname } = props

  function getPageBlocksMenu (): Array<PageFormat> {
    let pages = []
    pages = pages.concat(defaultPages)
    pages = pages.concat(lowPages)
    pages = pages.concat(highPages)
    return pages
  }

  function getAvatarUrl (): string {
    return `/${avatar}`
  }

  function getFullName (): string {
    return `${firstname} ${lastname}`
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

  return (
      <>
        <Reload />
        <Style>
            {
                userType !== 'root' ? getHeaderSideBar() : null
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
