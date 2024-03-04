import CryptrLogOutBtn from './components/CryptrLogOutButton'
import CryptrSignInWithDomainButton from './components/CryptrSignInWithDomainButton'
import CryptrSignInWithEmailButton from './components/CryptrSignInWithEmailButton'

export const SignInWithDomainButton = CryptrSignInWithDomainButton
export const SignInWithEmailButton = CryptrSignInWithEmailButton
export const LogOutButton = CryptrLogOutBtn
export { default as CryptrProvider } from './CryptrProvider'
export { default as useCryptr } from './useCryptr'

export {
  Config,
  ProviderConfig,
  User,
  MetaDatas,
  CryptrTokenClaims,
} from './utils/cryptr.interfaces'

const CryptrReact = {}

export default CryptrReact
