import { useRouter } from 'next/router'
import { FC } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/404PageStyle'

const Home: FC = () => {
  const router = useRouter()

  const goToHome = () => {
    router.push('/')
  }

  return (
    <>
      <MyHead title="404" />
      <Style>
        <h2>
            Ooops! Page not found.
        </h2>
        <h1>
            404
        </h1>
        <p>
            Não conseguimos encontrar a página que você está procurando.
        </p>
        <input type='button' value='voltar para o início' onClick={goToHome}/>
      </Style>
    </>
  )
}

export default Home
