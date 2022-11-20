import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logo from '../../public/images/logo.svg'
import SignInButton from './SignInButton'

import styles from './styles/Header.module.css'
import ThemeButton from './ThemeButton'


export default function Header() {
  const { asPath } = useRouter()

  return (
    <header className={styles.background}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href={'/'}>
            <Image className='logo' src={logo} alt="IgNews" />
          </Link>
          <nav className={styles.nav}>
            <Link
              id={asPath === '/' ? styles.active : ''}
              href="/"
              className={styles.navLink}>
              Home
            </Link>
            <Link
              id={asPath.includes('/posts') ? styles.active : ''}
              href="/posts"
              className={styles.navLink}>
              Posts
            </Link>
          </nav>
        </div>
        <div className={styles.rightSection}>
          <SignInButton />
          <ThemeButton />
        </div>
      </div>
    </header>
  )
}
