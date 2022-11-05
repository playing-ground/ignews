import { ReactNode } from "react";
import Header from "./Header";

import styles from './styles/Layout.module.css'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div>
        {children}
      </div>
    </div>
  )
}
