import { useEffect, useContext } from 'react'
import Link from 'next/link'
import Context from '../../context/globalContext.js'

import {
  Avatar,
  Image,
  Navbar,
  Text,
  Link as NextUiLink,
  Button,
  Loading,
  Dropdown
} from '@nextui-org/react'

import { supabase } from '../../utils/supabaseClient'

import { FiLogOut, FiMoon } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

const TopBar = () => {
  const { session, setSession } = useContext(Context)
  console.log({ session })

  useEffect(() => {
    let mounted = true

    async function getInitialSession () {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }
      }
    }

    getInitialSession()

    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('onAuthStateChange', { event, session })
        if (event === 'SIGNED_IN') setSession(session)
        if (event === 'SIGNED_OUT') setSession(null)
      }
    )

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [setSession])

  const signInWithGithub = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      })
      if (error) throw error
    } catch (error) {
      console.log({ error })
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
  }

  return (
    <Navbar isBordered disableShadow maxWidth='fluid'>
      <Navbar.Brand>
        <Image alt='logo' src='/logo.png' width={25} height={25} />
        <Text b css={{ marginLeft: '$xs' }} size='$md'>
          <Link href='/'>CoinHunter</Link>
        </Text>
        <Text css={{ marginLeft: '$xs' }} color='grey' size='$sm'>
          alpha
        </Text>
      </Navbar.Brand>

      <Navbar.Content enableCursorHighlight>
        <Navbar.Link>
          <Link href='/coins'>Las monedas</Link>
        </Navbar.Link>
        <Navbar.Link isDisabled>
          <Link href='/exchange'>Intercambio</Link>
        </Navbar.Link>
      </Navbar.Content>

      <Navbar.Content>
        <Navbar.Item>
          {!session ? (
            <Button
              onClick={() => signInWithGithub()}
              color='warning'
              size='sm'
              weight='bold'
            >
              Inicia sesión
              {false && <Loading color='currentColor' size='sm' />}
            </Button>
          ) : (
            <Navbar.Content>
              <Dropdown placement='bottom-right'>
                <Navbar.Item>
                  <Dropdown.Trigger>
                    <Avatar
                      bordered
                      as='button'
                      color='warning'
                      size='md'
                      src={session.user.user_metadata.avatar_url}
                    />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                  aria-label='User menu actions'
                  color='secondary'
                  onAction={actionKey => {
                    switch (actionKey) {
                      case 'logout':
                        return signOut()
                      default:
                        break
                    }
                  }}
                >
                  <Dropdown.Item key='profile' css={{ height: '$14' }}>
                    <Text b css={{ d: 'flex' }}>
                      Hola, {session.user.user_metadata.name}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<FiLogOut size={20} />}
                    key='logout'
                    withDivider
                    color='error'
                  >
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
          )}
        </Navbar.Item>

        <Navbar.Content>
          <Navbar.Link>
            <FaGithub size={22} color='black' />
          </Navbar.Link>
        </Navbar.Content>

        <Navbar.Content>
          <NextUiLink href='#'>
            <FiMoon size={22} color='black' />
          </NextUiLink>
        </Navbar.Content>
      </Navbar.Content>
    </Navbar>
  )
}

export default TopBar
