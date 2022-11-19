import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/images/logo.svg'
import SignInButton from './SignInButton'

import styles from './styles/Header.module.css'
import ThemeButton from './ThemeButton'


export default function Header() {
  return (
    <header className={styles.background}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href={'/'}>
            <Image className='logo' src={logo} alt="IgNews" />
          </Link>
          <nav className={styles.nav}>
            <Link id={styles.active} href="/" className={styles.navLink}>Home</Link>
            <Link href="/posts" className={styles.navLink}>Posts</Link>
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
