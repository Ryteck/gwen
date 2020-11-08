import { FC } from 'react'
import Head from 'next/head'

interface MyHeadProps {
    title: string;
}

const MyHead: FC<MyHeadProps> = props => {
  const { title } = props
  return (
        <Head>
            <title>
                {
                    props.title
                }
            </title>
        </Head>
  )
}

export default MyHead
