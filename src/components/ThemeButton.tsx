import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'

import styles from './styles/ThemeButton.module.css'

export default function ThemeButton() {
  const [isLight, setIsLight] = useState(false)

  function setTheme() {
    setIsLight(!isLight)
  }

  useEffect(() => {
    isLight ? (
      document.body.classList.add('light'),
      document.body.classList.remove('dark'),
      document.documentElement.style.setProperty('color-scheme', 'light')
    ) : (
      document.body.classList.add('dark'),
      document.body.classList.remove('light'),
      document.documentElement.style.setProperty('color-scheme', 'dark')
    )
  }, [isLight])

  return (
    <button onClick={setTheme} className={styles.button}>
      {isLight ? <FaMoon /> : <FaSun />}
    </button >
  )
}
