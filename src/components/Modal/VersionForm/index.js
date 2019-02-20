import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectVersion } from './actions'

import Edit from './Edit'
import Create from './Create'
import Select from './Select'

const FormOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: calc(100% + 50px);
  transform: translateX(-25px);
  cursor: pointer;
`
const Option = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  font-size: 14px;
  font-weight: 300;
  border-bottom: 1px solid #e4e4e4;
  transition: border-bottom 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${({ isSelected }) =>
    isSelected &&
    `
  border-bottom: 1px solid #3e3e3e;
  `}
`

class VersionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: 'select',
      options: ['select', 'create', 'edit'],
    }
  }
  showForm = form => () => {
    this.setState({ form })
  }
  render() {
    const { form, options } = this.state

    return (
      <Fragment>
        <FormOptions>
          {options.map(option => (
            <Option
              key={option}
              isSelected={form === option}
              onClick={this.showForm(option)}
            >
              {option}
            </Option>
          ))}
        </FormOptions>
        {
          {
            edit: <Edit {...this.props} />,
            create: <Create {...this.props} />,
            select: <Select {...this.props} />,
          }[form]
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  versions: state.pages.versions,
  selectedVersion: state.pages.selectedVersion,
})

const mapDispatchToProps = dispatch => ({
  selectVersion: version => dispatch(selectVersion(version)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VersionForm)
