import { Link, createFileRoute } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/check-email')({
  component: CheckEmailPage,
})

function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-[420px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border-none">
        <CardHeader className="text-center flex flex-col items-center space-y-2 pb-6 pt-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
            <Mail className="h-8 w-8" strokeWidth={2} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-[#1a1a1a]">
            Revisa tu correo
          </CardTitle>
          <CardDescription className="text-gray-500 max-w-xs mx-auto">
            Hemos enviado un enlace de verificación a tu dirección de correo
            electrónico.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 px-10 pb-10">
          <p className="text-sm text-center text-gray-500">
            Por favor, haz clic en el enlace del correo para activar tu cuenta y
            comenzar.
          </p>
          <div className="pt-4">
            <Button asChild className="w-full bg-[#335D64] hover:bg-[#2A4D53]">
              <Link to="/login">Volver al inicio de sesión</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
