import { FC } from 'react'
import Style from '../../styles/components/sideBarComponentStyle'
import Image from 'next/image'
import PageBlock from './pageBlock'

interface PageFormat {
    title: string;
    path: string;
}

const defaultPages: Array<PageFormat> = [
  { title: 'Home', path: '/home' },
  { title: 'Perfil', path: '/perfil' }
]

const highPages: Array<PageFormat> = [

]

const lowPages: Array<PageFormat> = [

]

interface SideBarProps {
    activePath: string;
}

const SideBar: FC<SideBarProps> = props => {
  const { activePath } = props

  function getPageBlocksMenu (): Array<PageFormat> {
    let pages = []
    pages = pages.concat(defaultPages)
    pages = pages.concat(highPages)
    pages = pages.concat(lowPages)
    return pages
  }

  return (
        <Style>
            <div className='side-header'>
                <Image src='/default_avatar.jpg' width={200} height={200} className='avatar'/>
                <span>Ryan Martins</span>
            </div>
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
  )
}

export default SideBar
