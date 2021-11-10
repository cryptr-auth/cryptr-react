import React from 'react'
import { Route, useHistory } from "react-router-dom"
import { useCryptr } from '../lib'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
   const {isLoading, isAuthenticated} = useCryptr()
   const history = useHistory();

   if(isLoading) {
     return (
       <Route {...rest} render={() => <span>Loading</span>} />
     )
    }

    return (
      <Route {...rest} render={(props) => (
          isAuthenticated() === true
            ? <Component {...props} />
            : history.push("/login")
        )}
      />
    )
}

export default ProtectedRoute
