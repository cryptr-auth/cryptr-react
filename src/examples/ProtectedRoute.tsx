import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { useCryptr } from '../lib'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = ({ component: Component, ...rest }: React.PropsWithChildren<any>): Route => {
  const { isLoading, isAuthenticated } = useCryptr()
  const history = useHistory()

  if (isLoading) {
    return <Route {...rest} render={() => <span>Loading</span>} />
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() === true ? <Component {...props} /> : history.push('/login')
      }
    />
  )
}

export default ProtectedRoute
