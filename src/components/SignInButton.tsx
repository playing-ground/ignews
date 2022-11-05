import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles/SignInButton.module.css'

export default function SignInButton() {
  const isUserLoggedIn = true;

  return (
    <button className={styles.button}>
      <FaGithub
        style={isUserLoggedIn ? (
          { color: 'var(--green-500)' }
        ) : (
          { color: 'var(--yellow-500)' }
        )}
      />
      {isUserLoggedIn ? (
        <span className={styles.userName}>
          Mateus Abelli
        </span>
      ) : (
        'Sign in with GitHub'
      )}
      {isUserLoggedIn && <FiX />}
    </button>
  )
}
