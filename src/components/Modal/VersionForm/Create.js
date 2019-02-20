import React from 'react'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

import Dropdown from '../../../atoms/Dropdown'

const Container = styled.div`
  display: grid;
  grid-gap: 30px;
`

const Create = props => {
  function transformSelectionOptions(versions) {
    return versions.map(version => ({ name: version, value: version }))
  }

  const { versions, handleChange, version = '', name = '' } = props

  const currentDate = new Date().toISOString().slice(0, -8)

  return (
    <Container>
      <TextField
        label="name"
        value={name}
        helperText={'create your identifying version name'}
        onChange={handleChange('name')}
      />
      {/* highlight default version */}
      <Dropdown
        label="versions"
        selectedOption={version}
        onOptionSelect={handleChange('version')}
        selectOptions={transformSelectionOptions(versions)}
      />
      <TextField
        id="datetime-local"
        label="Start"
        type="datetime-local"
        defaultValue={currentDate}
        onChange={handleChange('startTime')}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="datetime-local"
        label="End"
        type="datetime-local"
        defaultValue={currentDate}
        onChange={handleChange('endTime')}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Container>
  )
}

export default Create
