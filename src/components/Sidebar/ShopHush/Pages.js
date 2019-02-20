import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes, css } from 'styled-components'

import {
  openModal,
  selectPage,
  saveCategory,
  removePage,
  closeModal,
} from './actions'

import DragIndicator from '@material-ui/icons/DragIndicator'
import Save from '@material-ui/icons/Save'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'

import Categories from './Categories'

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(1.15, 1.15, 1.15);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`
const Page = styled.div`
  padding: 11px 25px;
  display: grid;
  grid-template-columns: 40px auto 33px 33px;
  align-items: center;
  cursor: pointer;
  letter-spacing: 0.5px;
  & .add, .name {
    transition: opacity 0.3s ease-out;
  }
  & .add,
  .reorder {
    opacity: 0;
    font-size: 20px;
    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  & .reorder {
    font-size: 18px;
  }
  & .reorder-save {
    display: none;
    font-size: 20px;
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
  & .reorder-close {
    display: none;
    font-size: 20px;
  }
  &:hover {
    background: #e4e4e4;
  }
  ${({ isSelected }) =>
    isSelected &&
    `
    background: #e4e4e4;
    & .add, .reorder {
      opacity: 1;
    }
    `}
  ${({ isReorderable }) =>
    isReorderable &&
    `
    & .name {
      opacity: 0.2;
    }
  `}
  ${({ isSelected, isReorderable }) =>
    isSelected &&
    isReorderable &&
    css`
      & .name,
      .add {
        opacity: 0.2;
      }
      & .reorder {
        display: none;
      }
      & .reorder-close {
        display: block;
      }
    `}
  ${({ enabledSave }) =>
    enabledSave &&
    `
      & .reorder-close {
        display: none;
      }
    `}
`

class Pages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isReorderable: false,
    }
  }
  removePage = pageId => () => {
    this.props.removePage(pageId)
  }
  openCategoryForm = page => () => {
    this.props.openModal({
      page,
      type: 'category',
      title: 'create category',
      handleSave: category => () => {
        this.props.saveCategory(category)
        this.props.closeModal()
      },
    })
  }
  selectPage = name => () => {
    this.setState({
      selectedCategory: '',
      isReorderable: false,
      enabledSave: false,
    })
    this.props.selectPage(name)
  }
  makeReorderable = () => {
    this.setState({ isReorderable: true, selectedCategory: '' })
  }
  saveSubCatOrder = () => {
    console.log('saveSubCatOrder')
    this.setState({ isReorderable: false, enabledSave: false })
  }
  closeReorder = () => {
    this.setState({ isReorderable: false })
  }
  enableSaveReorder = () => {
    if (!this.state.enabledSave) {
      this.setState({ enabledSave: true })
    }
  }
  render() {
    const { selectedVersion, selectedPage } = this.props
    const { enabledSave } = this.state

    return (
      <div>
        {selectedVersion.pages.map(({ name, categories }) => (
          <Fragment key={name}>
            <Page
              isSelected={name === selectedPage.name}
              isReorderable={this.state.isReorderable}
              enabledSave={enabledSave}
            >
              <div />
              <div className="name" onClick={this.selectPage(name)}>
                {name}
              </div>
              <Add className="add" onClick={this.openCategoryForm(name)} />
              <DragIndicator
                className="reorder"
                onClick={this.makeReorderable}
              />
              <Save
                className="reorder reorder-save"
                style={{ display: enabledSave ? 'block' : 'none' }}
                onClick={this.saveSubCatOrder}
              />
              <Close
                className="reorder reorder-close"
                onClick={this.closeReorder}
              />
            </Page>

            <Categories
              {...this.props}
              page={name}
              categories={categories}
              isReorderable={this.state.isReorderable}
              enableSaveReorder={this.enableSaveReorder}
            />
          </Fragment>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedPage: state.pages.selectedPage,
  selectedVersion: state.pages.selectedVersion,
})

const mapDispatchToProps = dispatch => ({
  openModal: form => dispatch(openModal(form)),
  selectPage: page => dispatch(selectPage(page)),
  removePage: page => dispatch(removePage(page)),
  saveCategory: page => dispatch(saveCategory(page)),
  closeModal: page => dispatch(closeModal(page)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pages)
