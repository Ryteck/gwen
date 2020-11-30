import { FC } from 'react'
import Head from 'next/head'

interface MyHeadProps {
    title: string;
}

const MyHead: FC<MyHeadProps> = props => {
  const { title } = props
  return (
        <Head>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <title>
                {
                    title
                }
            </title>
        </Head>
  )
}

export default MyHead
