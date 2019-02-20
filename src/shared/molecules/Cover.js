import React from 'react'
import styled from 'styled-components'

// import CallToAction from './CallToAction'

const Container = styled.div`
  text-align: center;
  cursor: pointer;
  position: relative;
`
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const Cover = props => {
  const { cover } = props

  return (
    <Container>
      <Image src={cover.imageUrl} alt={cover.altText} />
      {/* <CallToAction {...cover.cta} /> */}
    </Container>
  )
}

export default Cover
