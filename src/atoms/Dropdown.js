import React, { Fragment } from 'react'
import styled from 'styled-components'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const StyledFormControl = styled(FormControl)`
  && {
    min-width: 120px;
  }
`

function Dropdown(props) {
  return (
    <Fragment>
      <StyledFormControl>
        <InputLabel htmlFor="component">{props.label}</InputLabel>
        <Select
          value={props.selectedOption}
          onChange={props.onOptionSelect}
          inputProps={{ name: 'component', id: 'component' }}
        >
          {props.selectOptions.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Fragment>
  )
}

export default Dropdown
