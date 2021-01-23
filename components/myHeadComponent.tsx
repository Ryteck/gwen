import { FC } from 'react'
import Head from 'next/head'

interface MyHeadProps {
    title: string;
}

const MyHead: FC<MyHeadProps> = props => {
  const { title } = props
  return (
        <Head>
			<meta
				name="google-site-verification"
				content="ZQmkFcwe1o3pEfRWbprH3clitm6aq4jZzZ32yP41XZc"
			/>
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
