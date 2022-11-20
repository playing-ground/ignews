import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../services/api'
import { getStripeJs } from '../services/stripe-js'
import styles from './styles/SubscribeButton.module.css'

type SubscribeButtonProps = {
  priceId: string
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      await signIn('auth0')
      return
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/checkout')
      const { sessionId } = response.data
      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({ sessionId })

    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <button
      className={styles.button}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
