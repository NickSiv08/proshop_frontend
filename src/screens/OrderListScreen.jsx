import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)

  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <th>{order._id}</th>
                <th>
                  <Link to={`/admin/users/${order.user._id}/edit`}>
                    {order.user.name}
                  </Link>
                </th>
                <th>{order.createdAt}</th>
                <th>
                  {order.isPaid ? (
                    <div>
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>{' '}
                      {order.paidAt}
                    </div>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </th>
                <th>
                  {order.isDelivered ? (
                    <div>
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>{' '}
                      {order.DeliveredAt}
                    </div>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </th>
                <th>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
