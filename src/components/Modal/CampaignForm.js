import React from 'react'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`

const CampaignForm = props => {
  const { handleChange, slug } = props
  // const { pageId } = this.props

  return (
    <Inputs>
      <TextField
        label="slug"
        value={slug}
        helperText={`/campaign/${slug}`}
        onChange={handleChange('slug')}
        style={{ marginTop: '20px' }}
      />
    </Inputs>
  )
}

export default CampaignForm
