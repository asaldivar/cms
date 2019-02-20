import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Settings from '@material-ui/icons/Settings'

import { openModal, closeModal, createVersion } from './actions'

const Container = styled.div`
  margin-left: 50px;
  display: grid;
  grid-template-columns: 1fr 90px;
  align-items: center;
  cursor: pointer;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  & .version {
    font-size: 10px;
    font-weight: 400;
  }
`
const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  transform: translateX(90px);
  ${Container}:hover & {
    transform: translateX(0px);
  }
`
const SettingsIcon = styled(Settings)`
  && {
    font-size: 18px;
    &:hover {
      transform: scale(1.1);
    }
  }
`
const Version = styled.p`
  margin-left: 50px;
  margin-bottom: 5px;
  font-size: 10px;
  font-weight: 400;
`

class Header extends Component {
  openVersionForm = page => () => {
    // need to figure out this.props.pages
    const { pages, openModal } = this.props

    openModal({
      page,
      type: 'version',
      title: 'versions',
      handleSave: version => () => {
        const clonedVersion = pages
          .filter(({ pageId }) => pageId === version.version)
          .map(site => ({
            ...site,
            version: version.slug,
          }))

        this.props.createVersion(clonedVersion)
        this.props.closeModal()
      },
    })
  }
  render() {
    const { selectedVersion } = this.props

    return (
      <Fragment>
        <Container>
          <Title>shophush</Title>
          <Options>
            <SettingsIcon
              onClick={this.openVersionForm(selectedVersion.pages)}
            />
          </Options>
        </Container>
        <Version>({selectedVersion.name})</Version>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  selectedVersion: state.pages.selectedVersion,
})

const mapDispatchToProps = dispatch => ({
  openModal: form => dispatch(openModal(form)),
  closeModal: page => dispatch(closeModal(page)),
  createVersion: page => dispatch(createVersion(page)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
