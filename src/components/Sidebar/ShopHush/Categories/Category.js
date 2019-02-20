import React from 'react'
import styled from 'styled-components'
import { DragSource, DropTarget } from 'react-dnd'

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import DragHandle from '@material-ui/icons/DragHandle'

const Container = styled.div`
  padding: 3px 25px;
  position: relative;
  display: grid;
  grid-template-columns: 35px auto;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  &:hover:not(.selected) {
    background: #e4e4e4;
  }
  & .delete {
    transform: translateX(-50px);
    transition: transform 0.5s;
    justify-self: center;
    &:hover {
      color: tomato;
    }
  }
  & .drag-handle {
    position: absolute;
    left: 50px;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }
  & .name {
    padding-left: 25px;
  }
  ${({ isSelected }) =>
    isSelected &&
    `
    background: #cdcdcd;
    & .delete {
      transform: translateX(-0px);
    }
  `}
  ${({ isReorderable }) =>
    isReorderable &&
    `
    cursor: grab;
    &:hover:not(.selected) {
      background: none;
    }
    & .delete {
      visibility: hidden;
    }
    & .drag-handle {
      opacity: 1;
    }
  `}
  ${({ isDragging }) =>
    isDragging &&
    `
  opacity: 0;
  `}
`
const Delete = styled(DeleteOutline)`
  && {
    font-size: 15px;
  }
`

// DRAG ////////////////////////////////
const DND_TYPES = {
  CATEGORY: 'category',
}
const categorySource = {
  beginDrag(props) {
    return {
      index: props.index,
    }
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      props.enableSaveReorder()
    }
  },
  canDrag(props) {
    return props.isReorderable
  },
}
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
/////////////////////////////////////////
// DROP /////////////////////////////////
const categoryTarget = {
  hover(props, monitor) {
    const { index: dragIndex } = monitor.getItem()
    const { index: hoverIndex } = props

    if (dragIndex !== hoverIndex) {
      props.moveCategory(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  },
}
function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}
/////////////////////////////////////////

const Category = props => {
  const {
    category,
    selectedCategory,
    deleteCategory,
    isReorderable,
    selectCategory,
    page,
    index,
    connectDragSource,
    connectDropTarget,
    isDragging,
    enableSaveReorder,
  } = props

  return (
    <Container
      index={index}
      className={category.slug === selectedCategory && 'selected'}
      isSelected={category.slug === selectedCategory}
      enableSaveReorder={enableSaveReorder}
      isReorderable={isReorderable}
      isDragging={isDragging}
      ref={category => {
        // eslint-disable-next-line no-sequences
        return connectDragSource(category), connectDropTarget(category)
      }}
    >
      <Delete className="delete" onClick={deleteCategory} />
      <DragHandle className="drag-handle" />
      <div className="name" onClick={selectCategory(category, page)}>
        {category.slug}
      </div>
    </Container>
  )
}

export default DropTarget(DND_TYPES.CATEGORY, categoryTarget, collectTarget)(
  DragSource(DND_TYPES.CATEGORY, categorySource, collectSource)(Category),
)
