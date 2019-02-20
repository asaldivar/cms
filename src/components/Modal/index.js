import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { closeModal } from './actions'

import Form from './Form'

const Container = styled.div`
  position: fixed;
  height: calc(100vh - 56px);
  width: 500px;
  margin: auto 0;
  top: 28px;
  right: 22px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  display: grid;
  background: #f2f2f2;
  box-shadow: 0 4px 33px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  opacity: 0;
  z-index: -666;
  ${({ isOpen }) =>
    isOpen &&
    `
    z-index: 999;
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
    `}
  & .title,
  .completion-options {
    display: grid;
    justify-items: center;
    text-transform: uppercase;
  }
  & .title {
    font-weight: 500;
    margin-top: 20px;
  }
  & .body {
    margin: 20px 25px;
    display: grid;
    grid-gap: 10px;
    grid-auto-rows: min-content;
  }
  & .completion-options {
    grid-template-columns: 1fr 1fr;
    align-self: end;
    border-top: 1px solid #e4e4e4;
    cursor: pointer;
    & div:first-child {
      border-right: 1px solid #e4e4e4;
    }
    &-cancel,
    &-apply {
      display: grid;
      width: 100%;
      padding: 10px 0;
      font-size: 12px;
      font-weight: 500;
      justify-content: center;
      transition: background-color 0.1s ease-in-out, opacity 0.1s ease-in-out;
      &:hover {
        background-color: #fff;
      }
    }
  }
`

class FormContainer extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.escape, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escape, false)
  }
  escape = e => {
    if (e.keyCode === 27) return this.props.closeModal()
  }
  handleChange = k => e => {
    this.setState({
      [k]: e.target.value,
    })
  }
  createAsset = asset => {
    this.setState(asset)
  }
  render() {
    const { modal } = this.props

    return (
      <Container isOpen={modal.isOpen}>
        <div className="title">{modal.form.title}</div>
        <div className="body">
          <Form
            {...this.state}
            form={modal.form.type}
            {...this.props.modal.form}
            handleChange={this.handleChange}
            createAsset={this.createAsset}
          />
        </div>
        <div className="completion-options">
          <div
            className="completion-options-cancel"
            onClick={this.props.closeModal}
          >
            cancel
          </div>
          <div
            className="completion-options-apply"
            onClick={modal.form.handleSave(this.state)}
          >
            apply
          </div>
        </div>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  null,
  mapDispatchToProps,
)(FormContainer)
