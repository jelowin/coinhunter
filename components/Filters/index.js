import { supabase } from '../../utils/supabaseClient'
import { useState } from 'react'

const { Collapse, Grid, Checkbox } = require('@nextui-org/react')

const Filters = ({ countries, coinsData, setCoinsData }) => {
  const handleChage = async country => {
    const query = supabase
      .from('coins')
      .select(
        'country, description, exchange, image, reason, issueVolum, issueDate, year'
      )
    if (!country.length) {
      const { data: filteredData } = await query
      setCoinsData(filteredData)
    } else {
      const { data: filteredData } = await query.filter(
        'country',
        'in',
        `(${country})`
      )

      setCoinsData(filteredData)
    }
  }

  return (
    <Grid.Container gap={2}>
      <Grid>
        <Collapse.Group accordion={false}>
          <Collapse expanded title='Paises'>
            <Checkbox.Group color='warning' onChange={handleChage}>
              {countries.sort().map((country, index) => (
                <Checkbox key={index} value={country} size='sm'>
                  {country}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
  )
}

export default Filters

export async function getStaticProps (context) {
  const { supabase } = require('../../utils/supabaseClient')

  const { data, error } = await supabase.from('countries').select()
  return {
    props: {
      countries: data
    }
    // revalidate: 604800,
  }
}
