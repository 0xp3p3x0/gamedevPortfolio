
import { Suspense } from 'react'
import PlayClient from './PlayClient'

export default function PlayPage() {
  return (
    <Suspense fallback={null}>
      <PlayClient />
    </Suspense>
  )
}
