import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Product = ({ product }) => {
  useEffect(() => {
    AOS.init({ duration: 500 })
  })

  return (
    <Card className='my-3 p-3 rounded' data-aos='fade-up'>
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>

        <Card.Text as='h3'>&euro;{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
