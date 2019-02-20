import React, { Component } from 'react'
import styled from 'styled-components'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Container = styled.div`
  display: grid;
  grid-gap: 30px;
  margin: 0 -25px;
  ${({ selected }) =>
    selected &&
    `
  background: #cdcdcd;
  `}
`

class Create extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.select, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.select, false)
  }
  select = e => {
    const { versions, selectedVersion, selectVersion } = this.props
    const selectedIndex = versions.findIndex(el => el === selectedVersion.name)
    const versionsCount = versions.length

    if (e.keyCode === 38) {
      return selectedIndex - 1 >= 0
        ? selectVersion(versions[selectedIndex - 1])
        : selectVersion(versions[versionsCount - 1])
    }
    if (e.keyCode === 40) {
      return selectedIndex + 1 < versionsCount
        ? selectVersion(versions[selectedIndex + 1])
        : selectVersion(versions[0])
    }
  }
  handleClick = version => () => {
    const { selectVersion } = this.props
    selectVersion(version)
  }
  render() {
    const { versions, selectedVersion } = this.props
    return (
      <Container>
        <List component="nav">
          {versions.map(version => (
            <ListItem
              button
              key={version}
              onClick={this.handleClick(version)}
              selected={version === selectedVersion.name}
            >
              <ListItemText primary={version} />
            </ListItem>
          ))}
        </List>
      </Container>
    )
  }
}

export default Create
