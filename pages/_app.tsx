import { FC } from 'react'
import { AppProps } from 'next/app'
import Dosis from '../styles/dosisStyle'
import Global from '../styles/globalStyle'

const MyApp: FC<AppProps> = props => {
  const { Component, pageProps } = props
  return (
    <>
      <Dosis />
      <Global />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
