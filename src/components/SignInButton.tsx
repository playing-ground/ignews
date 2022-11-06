import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles/SignInButton.module.css'

export default function SignInButton() {
  const { data: session } = useSession()

  function handleSignIn() {
    signIn('auth0')
  }

  function handleSignOut() {
    signOut()
  }

  return session ? (
    <button className={styles.button} onClick={handleSignOut}>
      <FaUser style={{ color: 'var(--green-500)' }} />
      <span className={styles.userName}>
        {session.user?.name}
      </span>
      <FiX />
    </button>
  ) : (
    <button className={styles.button} onClick={handleSignIn}>
      <FaSignInAlt style={{ color: 'var(--yellow-500)' }} />
      Sign in
    </button>
  )
}
