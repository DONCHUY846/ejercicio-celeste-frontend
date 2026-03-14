import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/unauthorized')({
  component: UnauthorizedPage,
})

function UnauthorizedPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>403 - Acceso denegado</CardTitle>
          <CardDescription>
            No tienes permisos para acceder a este contenido.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button asChild>
            <Link to="/">Volver al Panel</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Ir al inicio</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
