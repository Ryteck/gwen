import { FC } from 'react'
import Style from '../../styles/components/sideBarComponentStyle/pageBlock'
import { FaArrowRight } from 'react-icons/fa'
import { useRouter } from 'next/router'

interface PageBlockProps {
    title: string;
    path: string;
    active: boolean;
}

const PageBlock: FC<PageBlockProps> = props => {
  const { title, path, active } = props

  const router = useRouter()

  return (
        <Style onClick={() => router.push(path)}>
            <div className={active ? 'enable' : 'disable'}>
                <span>
                    {
                        title
                    }
                </span>
                <span>
                    <FaArrowRight color="#F2EEDC" size="22" />
                </span>
            </div>
        </Style>
  )
}

export default PageBlock
