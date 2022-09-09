import Head from 'next/head'

import { Container, Grid, Text } from '@nextui-org/react'

import LandingContent from '@/components/LandingContent/index.js'

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
      <Container as='main' lg>
        <LandingContent />
      </Container>

      <Container lg>
        <Grid.Container
          as='footer'
          alignItems='center'
          css={{ height: '50px', margiBottom: '-50px' }}
          justify='center'
          xs={12}
        >
          <Grid>
            <Text h6>
              Desarollado por <a href=''>@jelowin</a>
            </Text>
          </Grid>
        </Grid.Container>
      </Container>

      {/* <Text small>
        <Link href="https://storyset.com/money">
          Money illustrations by Storyset
        </Link>
      </Text> */}
    </>
  )
}
