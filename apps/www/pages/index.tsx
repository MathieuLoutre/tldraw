import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Head>
        <title>tldraw</title>
      </Head>
      <Link href='/r/test'>Test</Link>
    </>
  )
}

export default Home

