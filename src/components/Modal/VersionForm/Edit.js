import React from 'react'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

const Container = styled.div`
  display: grid;
  grid-gap: 30px;
`

const Edit = props => {
  const { handleChange, selectedVersion } = props

  return (
    <Container>
      <TextField
        label="name"
        value={selectedVersion.name}
        helperText={'create your identifying version name'}
        onChange={handleChange('name')}
      />
      <TextField
        id="datetime-local"
        label="Start"
        type="datetime-local"
        defaultValue={selectedVersion.startTime}
        onChange={handleChange('startTime')}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="datetime-local"
        label="End"
        type="datetime-local"
        defaultValue={selectedVersion.endTime}
        onChange={handleChange('endTime')}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Container>
  )
}

export default Edit
