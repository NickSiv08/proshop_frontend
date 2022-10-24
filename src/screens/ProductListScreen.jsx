import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Snackbar, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'
import { useParams } from 'react-router-dom'

const ProductListScreen = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { pageNumber: pageNumberParam } = useParams()

  const pageNumber = pageNumberParam || 1

  const [successDeleteMessage, setSuccessDeleteMessage] = useState(false)

  const productList = useSelector((state) => state.productList)

  const { loading, error, products, pages, page } = productList

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const productCreate = useSelector((state) => state.productCreate)

  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate

  const productDelete = useSelector((state) => state.productDelete)

  const { success: successDelete, error: errorDelete } = productDelete

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteProduct(id))
      setSuccessDeleteMessage(true)
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus mr-1'></i> Create Product
          </Button>
        </Col>
      </Row>
      {successDelete && (
        <Snackbar
          open={successDeleteMessage}
          autoHideDuration={2000}
          onClose={() => setSuccessDeleteMessage(false)}
        >
          <Alert
            severity='success'
            onClose={() => setSuccessDeleteMessage(false)}
          >
            Product Deleted Successfully
          </Alert>
        </Snackbar>
      )}
      {errorDelete && <Message variant='danger'>{error}</Message>}
      {errorCreate && <Message variant='danger'>{error}</Message>}
      {loadingCreate && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <th>{product._id}</th>
                  <th>{product.name}</th>
                  <th>&euro;{product.price}</th>
                  <th>{product.category}</th>
                  <th>{product.brand}</th>
                  <th>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} isAdmin={true} page={page}></Paginate>
        </>
      )}
    </>
  )
}

export default ProductListScreen
