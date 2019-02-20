import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid green;
  position: absolute;
  left: 50px;
  bottom: 50px;
`

const CallToAction = props => (
  <Container>
    <h1>{props.headerText}</h1>
    <p>{props.supportText}</p>
  </Container>
)

export default CallToAction
