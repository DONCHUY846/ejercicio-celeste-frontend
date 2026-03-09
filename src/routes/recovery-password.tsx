import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { RecoveryPassword } from '@/features/auth/components/RecoveryPassword'

const recoveryPasswordSearchSchema = z.object({
  email: z.string().email().optional(),
})

export const Route = createFileRoute('/recovery-password')({
  validateSearch: recoveryPasswordSearchSchema,
  component: RecoveryPasswordPage,
})

function RecoveryPasswordPage() {
  const { email } = Route.useSearch()
  return <RecoveryPassword email={email} />
}
