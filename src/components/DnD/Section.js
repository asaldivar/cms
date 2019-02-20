import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

import DeleteOutline from '@material-ui/icons/DeleteOutline'

import SharedSection from '../../shared/organisms/Section'

import { deleteSection } from './actions'

const Container = styled.div`
  position: relative;
  border: 5px solid transparent;
  cursor: pointer;
  opacity: ${p => (p.isDragging ? 0.5 : 1)};
  &:hover {
    box-shadow: inset 0 0 0 1px rgba(128, 128, 128, 0.2);
  }
  &.editable {
    box-shadow: inset 0 0 0 1px rgba(128, 128, 128, 0.85);
  }
  ${({ isOver }) =>
    isOver &&
    `
    &.border-left {
      border-left: 5px solid #f88379;
    }
    &.border-right {
      border-right: 5px solid #f88379;
    }
    &.border-top {
      border-top: 5px solid #f88379;
    }
    &.border-bottom {
      border-bottom: 5px solid #f88379;
    }
    `}
`
const SectionOptions = styled.div`
  position: absolute;
  height: 0;
  overflow: hidden;
  width: max-content;
  top: 0;
  z-index: 999;
  transform: translatex(-50%);
  left: 50%;
  display: grid;
  justify-content: center;
  grid-template-columns: 44px 30px;
  justify-items: center;
  align-items: center;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  transition: height 0.05s ease-in;
  ${Container}:hover & {
    height: 36px;
  }
  & .edit,
  .delete-container {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    background: #3e3e3e;
  }
  & .edit {
    font-size: 10px;
    font-weight: 300;
  }
  & .delete-container {
    &:hover {
      background: tomato;
    }
  }
  & .delete {
    font-size: 16px;
  }
`
/*****************************DRAG********************************/
const DND_TYPES = {
  SECTION: 'section',
}

const sectionSource = {
  beginDrag(props) {
    return {
      id: props.sectionId,
      index: props.index,
      components: props.components,
    }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}
/*****************************DRAG********************************/

/*****************************DROP********************************/
const sectionTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) return

    const sectionBox = findDOMNode(component).getBoundingClientRect()
    const topY = (sectionBox.bottom - sectionBox.top) / 2
    const boxQuarterWidth = sectionBox.width / 4
    const leftQuarterX = boxQuarterWidth + sectionBox.left
    const rightQuarterX = boxQuarterWidth * 3 + sectionBox.left
    const mousePosition = monitor.getClientOffset()
    const hoverY = mousePosition.y - sectionBox.top

    findDOMNode(component).classList.remove(
      'border-left',
      'border-right',
      'border-bottom',
      'border-top',
    )

    if (mousePosition.x < leftQuarterX) {
      props.changeDirection('left')
      return findDOMNode(component).classList.add('border-left')
    }
    if (mousePosition.x > rightQuarterX) {
      props.changeDirection('right')
      return findDOMNode(component).classList.add('border-right')
    }
    if (hoverY < topY) {
      props.changeDirection('above')
      return findDOMNode(component).classList.add('border-top')
    }
    if (hoverY > topY) {
      props.changeDirection('below')
      return findDOMNode(component).classList.add('border-bottom')
    }
  },
  drop(props, monitor) {
    switch (props.direction) {
      case 'above':
      case 'below':
        return props.moveSection(monitor.getItem().index, props.index)
      case 'left':
        const updatedSectionBegin = [
          ...monitor.getItem().components,
          ...props.components,
        ]
        return props.combineSections(
          updatedSectionBegin,
          monitor.getItem().id,
          props.sectionId,
        )
      case 'right':
        const updatedSectionEnd = [
          ...props.components,
          ...monitor.getItem().components,
        ]
        return props.combineSections(
          updatedSectionEnd,
          monitor.getItem().id,
          props.sectionId,
        )
      default:
        return
    }
  },
}
function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}
/*****************************DROP********************************/

class Section extends Component {
  componentDidMount() {
    const img = new Image()
    img.src =
      'https://www.bristolgate.com/wp-content/uploads/2018/09/orionthemes-placeholder-image-150x100.png'
    img.onload = () => this.props.connectDragPreview(img)
  }
  deleteSection = () => {
    const { deleteSection, section } = this.props
    deleteSection(section.sectionId)
  }
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      isDragging,
    } = this.props
    return (
      <Container
        isDragging={isDragging}
        isOver={isOver}
        ref={section => {
          // eslint-disable-next-line no-sequences
          return connectDragSource(section), connectDropTarget(section)
        }}
      >
        <SectionOptions>
          <div className="edit">edit</div>
          <div className="delete-container" onClick={this.deleteSection}>
            <DeleteOutline className="delete" />
          </div>
        </SectionOptions>
        <SharedSection {...this.props} />
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteSection: id => dispatch(deleteSection(id)),
})

export default connect(
  null,
  mapDispatchToProps,
)(
  DragSource(DND_TYPES.SECTION, sectionSource, collect)(
    DropTarget(DND_TYPES.SECTION, sectionTarget, collectTarget)(Section),
  ),
)
