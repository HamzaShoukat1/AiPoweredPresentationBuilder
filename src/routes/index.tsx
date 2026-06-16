import { Badge } from '#/components/ui/badge'
import { Switch } from '#/components/ui/switch'
import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className='top-0'>
    <Button />

    </div>
  )
}
