import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../context/auth-context'

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
    nombre: z.string().min(1, { message: 'El nombre es requerido' }),
    apellido_p: z
      .string()
      .min(1, { message: 'El apellido paterno es requerido' }),
    apellido_m: z.string().optional(),
    celular: z
      .string()
      .min(10, { message: 'El celular debe tener al menos 10 dígitos' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    password_confirmation: z
      .string()
      .min(1, { message: 'La confirmación de contraseña es requerida' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  })

type FormValues = z.infer<typeof formSchema>

export const RegisterForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellido_p: '',
      apellido_m: '',
      celular: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    setError(null)
    try {
      await register(values)
      navigate({ to: '/check-email' })
    } catch (err: any) {
      setError(err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[500px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border-none">
      <CardHeader className="text-center flex flex-col items-center space-y-2 pb-6 pt-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50/50 text-[#335D64] border border-teal-100 mb-4">
          <UserPlus className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-[#1a1a1a]">
          Crear cuenta
        </CardTitle>
        <CardDescription className="text-gray-500">
          Ingresa tus datos para registrarte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-10 pb-10">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Juan"
                        className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellido_p"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                      Apellido Paterno
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pérez"
                        className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="apellido_m"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                      Apellido Materno (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="López"
                        className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="celular"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                      Celular
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5512345678"
                        className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu@email.com"
                      className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                    Confirmar Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#335D64] hover:bg-[#2A4D53] text-white font-semibold py-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
