import { FC } from 'react'
import { AppProps } from 'next/app'
import Dosis from '../styles/dosisStyle'
import Global from '../styles/globalStyle'
import Alert from '../styles/alertStyle'
import Notification from '../styles/notificationStyle'
import NotificationComponent from '../components/notificationComponent'

const MyApp: FC<AppProps> = props => {
  const { Component, pageProps } = props
  return (
    <>
      <Dosis />
      <Global />
      <Alert />
      <Notification />
      <Component {...pageProps} />
      <NotificationComponent />
    </>
  )
}

export default MyApp
