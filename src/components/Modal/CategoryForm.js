import React from 'react'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

import Dropdown from '../../atoms/Dropdown'

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`

const CategoryForm = props => {
  const { page, handleChange, family = '', slug = '' } = props

  return (
    <Inputs>
      <Dropdown
        label="Family"
        selectedOption={family}
        onOptionSelect={handleChange('family')}
        selectOptions={[{ value: '15-off', name: '15% off' }]}
      />
      <TextField
        label="name"
        value={slug}
        helperText={`/${page}/${slug}`}
        onChange={handleChange('slug')}
        style={{ marginTop: '20px' }}
      />
    </Inputs>
  )
}

export default CategoryForm
