import Image from 'next/image'
import logo from '../../public/images/logo.svg'
import styles from './styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Image className='logo' src={logo} alt="IgNews" />
        <nav className={styles.nav}>
          <a id={styles.active} href="" className={styles.navLink}>Home</a>
          <a href="" className={styles.navLink}>Posts</a>
        </nav>
      </div>
    </header>
  )
}
