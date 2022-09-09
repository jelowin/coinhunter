import {
  Row,
  Text,
  Col,
  Grid,
  Spacer,
  Input,
  Pagination
} from '@nextui-org/react'
import { useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import Head from 'next/head'
import CoinCard from '@/components/Card'
import Filters from '@/components/Filters'

export default function CoinsPage ({ coins, countries }) {
  const [coinsData, setCoinsData] = useState(coins)
  console.log({ coinsData })

  // const handlePaginate = (page) => {
  //   setInitialPage(page * 10)
  // }

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
      <Grid.Container gap={2} justify='center'>
        <Grid xs={0} sm={3} css={{ border: '1px solid red' }}>
          <Filters
            countries={countries}
            coinsData={coinsData}
            setCoinsData={setCoinsData}
          />
        </Grid>
        <Grid xs={12} sm={9} css={{ border: '1px solid blue' }}>
          <Grid.Container gap={2} justify='center'>
            <Row>
              <Col>
                <Text h1 size='$4xl'>
                  Catálogo
                </Text>
                <Spacer y={1} />
                <Input
                  bordered
                  clearable
                  labelLeft={<FiSearch size={20} />}
                  size='md'
                  shadow={false}
                  type='text'
                  placeholder='Busca tu moneda'
                />
              </Col>
            </Row>
            <Spacer y={2} />
            <Row>
              <Grid.Container as='section' gap={2}>
                {coinsData.map((item, index) => {
                  return (
                    <Grid as='article' xs={12} sm={3} key={index}>
                      <CoinCard item={item} />
                    </Grid>
                  )
                })}
              </Grid.Container>
            </Row>
            {/* <Row>
              <Pagination
                color='secondary'
                total={20}
                initialPage={1}
                onChange={handlePaginate}
              />
            </Row> */}
          </Grid.Container>
        </Grid>
      </Grid.Container>
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
