import React from 'react'
import styled from 'styled-components'
// import Slider from 'react-slick'

const Container = styled.div`
  border: 5px solid red;
  position: relative;
`
// const StyledSlider = styled(Slider)`
//   position: absolute;
//   max-height: 100%;
//   width: 100%;
//   border: 5px solid yellow;
// `
const Carousel = () => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // }

  return (
    <Container>
      {/* {<StyledSlider {...settings}>

        <div>
          <img
            src="https://source.unsplash.com/random/300x300"
            alt="alt text goes here"
          />
        </div>
      </StyledSlider>} */}
      <h2>carousel goes here</h2>
    </Container>
  )
}

export default Carousel
