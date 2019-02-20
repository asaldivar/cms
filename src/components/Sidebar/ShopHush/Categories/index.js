import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectCategory, deleteCategory } from '../actions'

import Category from './Category'

const Container = styled.div`
  box-sizing: border-box;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s;
  ${({ isSelected, count }) =>
    isSelected &&
    `
    max-height: calc(${count} * 30px);
    `}
`

class Categories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: this.props.categories,
      selectedCategory: '',
    }
  }
  selectCategory = (category, name) => () => {
    if (!this.props.isReorderable) {
      this.setState({ selectedCategory: category.slug })
      this.props.selectCategory({
        ...category,
        name,
        type: 'category',
      })
    }
  }
  deleteCategory = () => {
    const { selectedVersion, selectedPage, deleteCategory } = this.props
    const { selectedCategory } = this.state

    deleteCategory(selectedVersion.name, selectedPage.name, selectedCategory)
  }
  moveCategory = (dragIndex, hoverIndex) => {
    let { categories } = this.state
    const dragCategory = categories[dragIndex]
    const dropTarget = categories[hoverIndex]

    categories[hoverIndex] = dragCategory
    categories[dragIndex] = dropTarget

    this.setState({
      categories,
    })
  }
  render() {
    const { categories } = this.props
    const { selectedPage, page, enableSaveReorder } = this.props

    return (
      <Container
        count={categories.length}
        isSelected={page === selectedPage.name}
      >
        {!!categories.length &&
          categories.map((category, i) => (
            <Category
              key={category.slug}
              index={i}
              category={category}
              {...this.props}
              {...this.state}
              selectCategory={this.selectCategory}
              deleteCategory={this.deleteCategory}
              moveCategory={this.moveCategory}
            />
          ))}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  selectCategory: page => dispatch(selectCategory(page)),
  deleteCategory: (version, page, category) =>
    dispatch(deleteCategory(version, page, category)),
})

export default connect(
  null,
  mapDispatchToProps,
)(Categories)
