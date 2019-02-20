import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import { savePage, openModal, addSection, closeModal } from './actions'

import Add from '@material-ui/icons/Add'

const PageControls = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: calc(100% - 364px);
  z-index: 999;
  background-color: #3e3e3e;
  font-size: 12px;
  & .add {
    padding: 10px 15px;
    display: grid;
    justify-self: end;
    align-items: center;
    cursor: pointer;
    color: #fff;
    &:hover {
      background-color: #000;
    }
  }
`
const SaveCancel = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  & .save,
  .cancel {
    width: fit-content;
    padding: 10px 15px;
    align-self: center;
    /* font-size: 14px; */
    font-weight: 500;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out, opacity 0.1s ease-in-out;
    &:hover {
      background-color: #000;
    }
  }
`
const EditText = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  color: #797979;
`

class Nav extends Component {
  openModal = () => {
    const { openModal, addSection, closeModal } = this.props
    openModal({
      type: 'component',
      title: 'create component',
      handleSave: component => () => {
        const { componentType, ...componentData } = component
        const section = {
          sectionId: uuid(),
          components: [
            {
              componentId: uuid(),
              type: componentType,
              cover: componentData,
            },
          ],
        }

        addSection(section)
        closeModal()
      },
    })
  }
  savePage = () => {
    console.log('save page page:', this.props)
    this.props.savePage(this.props.selectedPage)
  }
  render() {
    const { selectedPage } = this.props

    return (
      <Fragment>
        <PageControls>
          <SaveCancel>
            <div className="save" onClick={this.savePage}>
              save
            </div>
            <div className="cancel">cancel</div>
          </SaveCancel>
          <EditText className="edit">
            Editing {`'${selectedPage.name || selectedPage.slug}'`}
          </EditText>
          <div className="add" onClick={this.openModal}>
            <Add />
          </div>
        </PageControls>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  savePage: pageId => dispatch(savePage(pageId)),
  openModal: form => dispatch(openModal(form)),
  closeModal: () => dispatch(closeModal()),
  addSection: section => dispatch(addSection(section)),
})

export default connect(
  null,
  mapDispatchToProps,
)(Nav)
