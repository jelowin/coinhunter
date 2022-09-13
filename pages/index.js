import Head from 'next/head'

export default function Home () {
  return (
    <>
      <Head>
        <title>CoinHunter</title>
        <meta
          name='description'
          content='Colecciona todas las monedas de dos euros conmemorativas de la Unión Europea'
        />
        <link rel='icon' href='/logo.png' />
      </Head>
      <main className='min-h-screen md:container md:mx-auto'>
        <section className=''>section 1</section>
        <section className=''>section 2</section>
      </main>
    </>
  )
}
