import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updatePageSections } from './actions'

import SharedLandingPage from '../../shared/templates/LandingPage'
import Section from './Section'

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      direction: '',
    }
  }
  changeDirection = direction => {
    this.setState({
      direction,
    })
  }
  moveSection = (sourceIndex, targetIndex) => {
    const { selectedPage } = this.props
    let sections = selectedPage.sections

    const sourceSection = sections[sourceIndex]

    sections.splice(sourceIndex, 1)
    sections = [
      ...sections.slice(0, targetIndex),
      sourceSection,
      ...sections.slice(targetIndex),
    ]

    this.props.updatePageSections(sections)
  }
  combineSections = (components, sourceId, targetId) => {
    const { selectedPage } = this.props

    const updatedSections = selectedPage.sections
      .filter(section => section.sectionId !== sourceId)
      .map(section =>
        section.sectionId === targetId ? { ...section, components } : section,
      )
    this.props.updatePageSections(updatedSections)
  }
  render() {
    return (
      <SharedLandingPage page={this.props.selectedPage}>
        {props => (
          <Section
            {...props}
            direction={this.state.direction}
            changeDirection={this.changeDirection}
            moveSection={this.moveSection}
            combineSections={this.combineSections}
          />
        )}
      </SharedLandingPage>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updatePageSections: (page, sections) =>
    dispatch(updatePageSections(page, sections)),
})

export default connect(
  null,
  mapDispatchToProps,
)(LandingPage)
