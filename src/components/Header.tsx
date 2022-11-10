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
            <a id={styles.active} href="" className={styles.navLink}>Home</a>
            <a href="" className={styles.navLink}>Posts</a>
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
