import React, { Fragment } from 'react'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const StyledLabel = styled.label`
  display: grid;
  margin-top: 10px;
`
const StyledButton = styled(Button)`
  display: grid;
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
`
const Input = styled.input`
  display: none;
`

const UploadButton = props => {
  async function uploadAssetToS3(e) {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('webstore-upload', file)

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })

    const { url } = await response.json()

    props.createAsset({ imageUrl: url })
  }
  return (
    <Fragment>
      <StyledLabel htmlFor="asset">
        <StyledButton component="span">
          <CloudUploadIcon />
        </StyledButton>
      </StyledLabel>
      <Input
        accept="image/*"
        id="asset"
        multiple
        type="file"
        onChange={uploadAssetToS3}
      />
    </Fragment>
  )
}

export default UploadButton
