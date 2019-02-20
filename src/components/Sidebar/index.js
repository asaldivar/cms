import React, { Component } from 'react'
import styled from 'styled-components'

import ShopHush from './ShopHush'

const Container = styled.div`
  height: 100%;
  padding-top: 88px;
`

class Sidebar extends Component {
  render() {
    return (
      <Container>
        <ShopHush />
      </Container>
    )
  }
}

export default Sidebar
