import {
  Button,
  Card,
  Col,
  Link as NextUiLink,
  Modal,
  Row,
  Text
} from '@nextui-org/react'
import { useState } from 'react'
import { HiOutlineHeart } from 'react-icons/hi'
import { MdOutlineChangeCircle } from 'react-icons/md'
import { BsBookmarkCheck } from 'react-icons/bs'

import styles from './Card.module.css'

const CoinCard = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleAddToFavorites = e => {
    const coinId = e.target.dataset.id
    console.log({ coinId })
  }

  return (
    <>
      <Card css={{ position: 'relative' }} isHoverable variant='bordered'>
        <Button
          className={styles.badge}
          auto
          color='black'
          bordered
          icon={<BsBookmarkCheck size={25} style={{ padding: 0, margin: 0 }} />}
        />
        <Card.Body>
          <Card.Image
            src={item?.image}
            objectFit='contain'
            width='100%'
            height='250px'
            alt='Image'
          />
        </Card.Body>
        <Card.Footer css={{ justifyItems: 'flex-start' }}>
          <Col>
            <Row wrap='wrap' justify='space-between' align='center'>
              <Text
                b
                css={{
                  fontSize: '$lg',
                  marginBottom: '$xs'
                }}
              >
                {item?.country}
              </Text>
              <Text
                b
                css={{
                  color: '$accents7',
                  fontSize: '$md'
                }}
              >
                {item?.year}
              </Text>
            </Row>
            <Row wrap='wrap' justify='flex-start' align='center'>
              <Text
                b
                css={{
                  color: '$accents7',
                  marginBottom: '$1',
                  fontSize: '$sm'
                }}
              >
                {item?.issueVolum}
              </Text>
            </Row>
            <Row wrap='wrap' justify='flex-start' align='center'>
              <Text
                css={{
                  fontSize: '$md',
                  marginBottom: '$md'
                }}
              >
                {item?.reason}
              </Text>
            </Row>
            <Row wrap='wrap' justify='flex-start' align='center'>
              <NextUiLink onClick={openModal}>Ver más</NextUiLink>
            </Row>
            <Row css={{ h: '40px' }} align='center'>
              <Button
                auto
                color='error'
                data-id={item.id}
                css={{ h: '100%' }}
                icon={<HiOutlineHeart size={25} />}
                size='xs'
                onClick={handleAddToFavorites}
              />
            </Row>
          </Col>
        </Card.Footer>
      </Card>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={modalOpen}
        onClose={closeModal}
      />
    </>
  )
}

export default CoinCard
