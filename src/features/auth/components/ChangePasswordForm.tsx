import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { KeyRound, Loader2 } from 'lucide-react'

import { useChangePassword } from '../hooks/useChangePassword'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const formSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: 'La contraseña actual es requerida' }),
    new_password: z.string().min(8, {
      message: 'La nueva contraseña debe tener al menos 8 caracteres',
    }),
    new_password_confirmation: z
      .string()
      .min(1, { message: 'La confirmación es requerida' }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['new_password_confirmation'],
  })

type FormValues = z.infer<typeof formSchema>

export const ChangePasswordForm = () => {
  const { mutate: changePassword, isPending, error } = useChangePassword()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    changePassword(values)
  }

  return (
    <Card className="w-full max-w-[450px] shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <KeyRound className="w-5 h-5 text-primary" />
          </div>
          <CardTitle>Cambiar Contraseña</CardTitle>
        </div>
        <CardDescription>
          Ingresa tu contraseña actual y la nueva para actualizarla. Se cerrarán
          todas las sesiones activas al confirmar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
            {error.message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña Actual</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
