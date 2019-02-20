import React from 'react'
import styled from 'styled-components'

import { moleculeMap } from '../molecules'

const Container = styled.div`
  height: ${p => p.height};
  display: grid;
  /* set minmax()  */
  grid-template-columns: repeat(${p => p.componentCount}, 1fr);
  grid-gap: 20px;
`

const Section = props => (
  <Container {...props}>
    {props.components.map(component => {
      const Component = moleculeMap[component.type]

      return <Component key={component.componentId} {...component} />
    })}
  </Container>
)

export default Section
