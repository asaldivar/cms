import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Content from './Content'

const Container = styled.div`
  position: relative;
  height: 100%;
`

class StorePreview extends Component {
  render() {
    return (
      <Container>
        <Content selectedPage={this.props.selectedPage} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedPage: state.pages.selectedPage,
  }
}

export default connect(mapStateToProps)(StorePreview)
