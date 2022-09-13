import { Button, Col, Grid, Image, Spacer, Text } from '@nextui-org/react'
import Link from 'next/link'

const LandingContent = () => {
  return (
    <Grid.Container as='section' alignItems='center' justify='center'>
      <Grid as='article' alignItems='center' justify='center' xs={12} sm={6}>
        <Col>
          <Text h1 size='$5xl' css={{ lineHeight: '$md' }}>
            Colecciona todas las monedas
          </Text>
          <Text
            color='#5e6778'
            css={{ lineHeight: '$sm' }}
            size='$2xl'
            weight='medium'
          >
            Reúne todas las monedas de dos euros conmemorativas de la Unión
            Europea.
          </Text>

          <Spacer y={2} />
          <Grid.Container as='section'>
            <Button
              auto
              color='warning'
              css={{ fontWeight: '$bold' }}
              flat
              iconRight={
                <Image
                  alt='magnifying glass'
                  src='/magnifying_glass.png'
                  width={25}
                  height={25}
                />
              }
              size='lg'
            >
              <Link href='/coins'>¡Empieza a coleccionar!</Link>
            </Button>
          </Grid.Container>
        </Col>
      </Grid>

      <Grid alignItems='center' justify='center' xs={0} sm={6}>
        <Image
          alt='coins'
          autoResize
          src='/coins-animate.svg'
          objectFit='cover'
          width='100vw'
        />
      </Grid>
    </Grid.Container>
  )
}

export default LandingContent
