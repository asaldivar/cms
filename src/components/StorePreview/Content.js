import React from 'react'
import styled from 'styled-components'

import Nav from './Nav'
import LandingPage from '../DnD/LandingPage'
import CategoryPage from '../../shared/templates/CategoryPage'
import CampaignPage from '../../shared/templates/CampaignPage'

const Container = styled.div`
  position: absolute;
  height: calc(100% - 44px);
  width: calc(100% - 22px);
  top: 22px;
  right: 22px;
  overflow: scroll;
  background: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.11);
`

const Content = props => {
  return (
    <Container>
      <Nav {...props} />
      {
        {
          landing: <LandingPage {...props} />,
          category: <CategoryPage {...props} />,
          campaign: <CampaignPage {...props} />,
        }[props.selectedPage.type]
      }
    </Container>
  )
}

export default Content
