import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 60px 20px 20px;
`

function setSectionHeight(component) {
  switch (component) {
    case 'cover':
      return '45vh'
    case 'carousel':
      return '45vh'
    case 'product':
      return '50vh'
    case 'magazine':
      return '130vh'
    default:
      return '25vh'
  }
}

const LandingPage = props => {
  const { page } = props

  return (
    <Container className="landing-page">
      {page.sections &&
        page.sections.map((section, i) => {
          const metadata = {
            componentCount: section.components.length,
            height: setSectionHeight(section.components[0].type),
            section,
          }
          return props.children({
            index: i,
            key: section.sectionId,
            ...metadata,
            ...section,
          })
        })}
    </Container>
  )
}

export default LandingPage
