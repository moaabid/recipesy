import { Splide, SplideSlide } from '@splidejs/react-splide'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import '@splidejs/react-splide/css'

export default function Popular() {
  const [popular, setPopular] = useState([])
  const getPopular = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`,
    )
    const data = await response.json()
    setPopular(data.recipes)
  }
  useEffect(() => {
    getPopular()
  }, [])
  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          gap: '4rem',
        }}
      >
        {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
              </Card>
            </SplideSlide>
          )
        })}
      </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 4rem 4rem;
`
const Card = styled.div`
  max-height: 20rem;
  max-width: 60rem;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
  }
`
