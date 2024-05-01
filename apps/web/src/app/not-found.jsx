import { RouterObject } from '../core/router'
import { Skeleton } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.push(RouterObject.route.HOME)
  }, [router])

  return <Skeleton />
}
