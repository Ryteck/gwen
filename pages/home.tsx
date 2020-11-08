import { FC } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/homePageStyle'

const Home: FC = () => {
  return (
    <>
      <MyHead title="Home" />
      <Style>
        Home
      </Style>
    </>
  )
}

export default Home
