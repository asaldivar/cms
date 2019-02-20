import React, { Fragment } from 'react'

import TextField from '@material-ui/core/TextField'

import UploadButton from '../../atoms/UploadButton.js'
import Dropdown from '../../atoms/Dropdown.js'

const ComponentForm = props => {
  const {
    componentType = '',
    actionUrl = '',
    handleChange,
    createAsset,
  } = props

  return (
    <Fragment>
      <Dropdown
        label="Component"
        selectedOption={componentType}
        onOptionSelect={handleChange('componentType')}
        selectOptions={[
          { value: 'cover', name: 'cover' },
          { value: 'carousel', name: 'carousel' },
        ]}
      />
      <TextField
        label="Cover link"
        id="margin-none"
        value={actionUrl}
        helperText="URL that user gets sent to"
        onChange={handleChange('actionUrl')}
      />
      <UploadButton
        sectionId={'pageId'}
        componentType={componentType}
        createAsset={createAsset}
      />
    </Fragment>
  )
}

export default ComponentForm
