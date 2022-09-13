import Head from 'next/head'

export default function CoinsPage ({ coins, countries }) {
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
    </>
  )
}

export async function getStaticProps (context) {
  const { supabase } = require('../../utils/supabaseClient')

  // const browserObject = require("../../server/browser");
  // const scraperController = require("../../server/controller");

  // //Start the browser and create a browser instance
  // let browserInstance = browserObject.startBrowser();

  // // Pass the browser instance to the scraper controller
  // const coins = await scraperController(browserInstance);

  try {
    const { data: coinsData } = await supabase.from('coins').select()
    const { data: countriesData } = await supabase.from('countries').select()
    const countries = countriesData.map(data => data.country)

    return {
      props: {
        coins: coinsData,
        countries
      }
      // revalidate: 604800,
    }
  } catch (e) {
    console.log('Error getStaticProps coins page', e)
  }
}
