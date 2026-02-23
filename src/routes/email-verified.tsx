import { Link, createFileRoute, useSearch } from '@tanstack/react-router'
import { CheckCircle2, XCircle } from 'lucide-react'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const searchSchema = z.object({
  verified: z.boolean().optional(),
  error: z.string().optional(),
})

export const Route = createFileRoute('/email-verified')({
  component: EmailVerifiedPage,
  validateSearch: searchSchema,
})

function EmailVerifiedPage() {
  const search = useSearch({ from: '/email-verified' })
  const isVerified = search.verified
  const error = search.error

  const getErrorMessage = (errorCode?: string) => {
    switch (errorCode) {
      case 'token_expired':
        return 'El enlace de verificación ha expirado. Por favor solicita uno nuevo.'
      case 'invalid_token':
        return 'El enlace de verificación no es válido.'
      default:
        return 'Hubo un problema al verificar tu correo electrónico.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-[420px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border-none">
        <CardHeader className="text-center flex flex-col items-center space-y-2 pb-6 pt-10">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full mb-4 ${
              isVerified
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {isVerified ? (
              <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
            ) : (
              <XCircle className="h-8 w-8" strokeWidth={2} />
            )}
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-[#1a1a1a]">
            {isVerified ? '¡Correo Verificado!' : 'Error de Verificación'}
          </CardTitle>
          <CardDescription className="text-gray-500 max-w-xs mx-auto">
            {isVerified
              ? 'Tu cuenta ha sido activada correctamente. Ya puedes iniciar sesión.'
              : getErrorMessage(error)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 px-10 pb-10">
          <div className="pt-4">
            <Button asChild className="w-full bg-[#335D64] hover:bg-[#2A4D53]">
              <Link to="/login">Ir a Iniciar Sesión</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
