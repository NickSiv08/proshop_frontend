import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { Snackbar, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteUser, listUsers } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [successDeleteMessage, setSuccessDeleteMessage] = useState(false)

  const userList = useSelector((state) => state.userList)

  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)

  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteUser(id))
      setSuccessDeleteMessage(true)
    }
  }

  return (
    <>
      <h1>Users</h1>
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
            User Deleted Successfully
          </Alert>
        </Snackbar>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>{user._id}</th>
                <th>{user.name}</th>
                <th>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </th>
                <th>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </th>
                <th>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
