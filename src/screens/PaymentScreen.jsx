import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart

  const navigate = useNavigate()

  const dispatch = useDispatch()

  if (!shippingAddress.address) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))

    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legennd'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal or credit card.'
              id='PayPal'
              name='paymentMethod'
              value='paypal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
