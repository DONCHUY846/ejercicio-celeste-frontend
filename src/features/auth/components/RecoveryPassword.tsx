import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Mail, Lock } from 'lucide-react'
import { toast } from 'sonner'

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

import { useSendOtpMutation, useVerifyOtpMutation } from '../hooks/useRecoveryPassword'

const formSchema = z.object({
  otp: z
    .string()
    .length(6, { message: 'El código debe tener exactamente 6 dígitos' })
    .regex(/^\d+$/, { message: 'El código debe contener solo números' }),
})

type FormValues = z.infer<typeof formSchema>

interface RecoveryPasswordProps {
  email?: string
}

export const RecoveryPassword = ({ email: initialEmail }: RecoveryPasswordProps) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState(initialEmail || '')
  const [isOtpSent, setIsOtpSent] = useState(false)
  
  const sendOtpMutation = useSendOtpMutation()
  const verifyOtpMutation = useVerifyOtpMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const handleSendOtp = async () => {
    if (!email) {
      toast.error('Por favor ingresa un correo electrónico')
      return
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        toast.error('Por favor ingresa un correo electrónico válido')
        return
    }

    try {
      await sendOtpMutation.mutateAsync({ email })
      setIsOtpSent(true)
      toast.success('Código enviado', {
        description: 'Revisa tu bandeja de entrada',
      })
    } catch (error: any) {
      toast.error('Error al enviar código', {
        description: error.message || 'Inténtalo de nuevo más tarde',
      })
    }
  }

  const onSubmit = async (values: FormValues) => {
    if (!email) return

    try {
      await verifyOtpMutation.mutateAsync({
        email,
        otp: values.otp,
      })
      
      toast.success('Contraseña restablecida', {
        description: 'Tu contraseña temporal es: password123',
      })
      
      navigate({ to: '/login' })
    } catch (error: any) {
      toast.error('Error de verificación', {
        description: error.message || 'El código es inválido o ha expirado',
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[420px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border-none">
        <CardHeader className="text-center flex flex-col items-center space-y-2 pb-6 pt-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50/50 text-[#335D64] border border-teal-100 mb-4">
            <Lock className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-[#1a1a1a]">
            Recuperar Contraseña
          </CardTitle>
          <CardDescription className="text-gray-500">
            {isOtpSent 
              ? 'Ingresa el código de 6 dígitos enviado a tu correo' 
              : 'Ingresa tu correo para recibir un código de recuperación'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-10 pb-10">
          {!isOtpSent ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 ml-1">
                  Email
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="tu@email.com"
                        className="pl-9 bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={sendOtpMutation.isPending}
                    />
                </div>
              </div>
              <Button
                onClick={handleSendOtp}
                className="w-full bg-[#335D64] hover:bg-[#2A4D53] text-white font-semibold py-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={sendOtpMutation.isPending || !email}
              >
                {sendOtpMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Código OTP'
                )}
              </Button>
              <div className="text-center">
                  <Button variant="link" onClick={() => navigate({ to: '/login' })} className="text-sm text-gray-500 hover:text-[#335D64]">
                      Volver al inicio de sesión
                  </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="text-sm text-center text-gray-600 bg-gray-50 p-2 rounded-lg mb-4">
                    Enviado a: <span className="font-semibold">{email}</span>
                    <button 
                        type="button" 
                        onClick={() => setIsOtpSent(false)} 
                        className="ml-2 text-xs text-[#335D64] underline hover:text-[#2A4D53]"
                    >
                        Cambiar
                    </button>
                </div>
                
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-gray-700 ml-1">
                        Código OTP
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          maxLength={6}
                          className="bg-gray-50/30 focus:border-[#335D64] focus:ring-[#335D64] text-center text-lg tracking-[0.5em] font-mono"
                          {...field}
                          onChange={(e) => {
                            // Allow only numbers
                            const value = e.target.value.replace(/[^0-9]/g, '')
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-[#335D64] hover:bg-[#2A4D53] text-white font-semibold py-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  disabled={verifyOtpMutation.isPending}
                >
                  {verifyOtpMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Verificar y Restablecer'
                  )}
                </Button>
                
                <div className="text-center">
                    <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={handleSendOtp} 
                        disabled={sendOtpMutation.isPending}
                        className="text-sm text-gray-500 hover:text-[#335D64]"
                    >
                        ¿No recibiste el código? Reenviar
                    </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
