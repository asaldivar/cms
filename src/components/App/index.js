import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import { fetchPages } from './actions'

import GlobalStyle from '../../styles/GlobalStyle'

import StorePreview from '../StorePreview'
import Sidebar from '../Sidebar'
import Modal from '../Modal'

const Container = styled.div`
  display: grid;
  grid-template-columns: 342px calc(100% - 342px);
  height: 100vh;
`

class App extends Component {
  componentDidMount = this.props.fetchPages

  render() {
    const { modal, pages, selectedPage } = this.props

    return (
      <Container>
        <Sidebar pages={pages} />
        <StorePreview page={selectedPage} />
        <Modal modal={modal} />
        <GlobalStyle />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modals,
    pages: state.pages.pages,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPages: () => dispatch(fetchPages()),
})

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
)
