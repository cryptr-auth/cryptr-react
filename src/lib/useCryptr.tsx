import { useContext } from 'react'
import CryptrContext from './CryptrContext'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCryptr = () => useContext(CryptrContext)

export default useCryptr
