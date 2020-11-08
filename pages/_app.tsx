import { FC } from 'react'
import { AppProps } from 'next/app'
import Dosis from '../styles/dosis'
import Global from '../styles/global'

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
