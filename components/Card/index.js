import React from 'react'
import Context from '../../context/globalContext.js'
import { ArrowsRightLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import { supabase } from '../../utils/supabaseClient'

const CoinCard = props => {
  const { country, id, image, reason, year } = props.coin
  const { session } = React.useContext(Context)

  const handleAddToFavorites = async () => {
    try {
      const { error } = await supabase
        .from('user_coin')
        .insert([{ user_id: session.user.id, coin_id: id }])
      if (error) throw error
    } catch (error) {
      console.error('Error adding favorite coin', error.message)
    }
  }

  return (
    <article
      className='bg-white flex flex-col items-center w-full relative p-4 rounded-md shadow-sm'
      key={id}
    >
      {/* Imagen */}
      <div className='flex flex-[1_1_auto] mb-4'>
        <img
          alt={reason}
          className='aspect-square'
          src={image}
          height={150}
          width={150}
        />
      </div>
      {/* Contenido */}
      <div className='flex flex-[2_1_auto] w-full'>
        <div className='flex flex-col'>
          <div className='flex justify-between mb-2'>
            <p className='font-semibold text-sm'>{country}</p>
            <p className='font-semibold  text-sm'>{year}</p>
          </div>

          <p className='mb-2 prose prose-slate line-clamp-2'>{reason}</p>
          <a
            className='text-sm underline text-blue-400 cursor-pointer'
            onClick={() => {}}
          >
            Ver más
          </a>
        </div>
      </div>
      {/* Botones */}
      <div className='flex flex-[1_1_auto] w-full'>
        <div className='border-r-2 flex justify-center items-center flex-[1_1_50%]'>
          <ArrowsRightLeftIcon className='cursor-pointer w-8 ' />
        </div>
        <div className='flex justify-center items-center  flex-[1_1_50%]'>
          <HeartIcon
            className='cursor-pointer w-8 '
            onClick={handleAddToFavorites}
          />
        </div>
      </div>
    </article>
  )
}

export default CoinCard
