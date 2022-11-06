import styles from './styles/SubscribeButton.module.css'

type SubscribeButtonProps = {
  priceId: string
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button className={styles.button}>
      Subscribe now
    </button>
  )
}
