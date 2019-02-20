import React, { Fragment } from 'react'

import ComponentForm from './ComponentForm'
import CategoryForm from './CategoryForm'
import CampaignForm from './CampaignForm'
import VersionForm from './VersionForm'

const Form = props => {
  return (
    <Fragment>
      {
        {
          component: <ComponentForm {...props} />,
          category: <CategoryForm {...props} />,
          campaign: <CampaignForm {...props} />,
          version: <VersionForm {...props} />,
        }[props.form]
      }
    </Fragment>
  )
}

export default Form
