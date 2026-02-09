import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { useCreateEvent } from '../hooks/useCreateEvent'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Schema
const formSchema = z.object({
  descripcion: z
    .string()
    .min(5, 'La descripción debe tener al menos 5 caracteres'),
  fecha: z.string().refine((val) => val !== '', 'La fecha es obligatoria'),
  preguntas: z
    .array(
      z.object({
        texto: z.string().min(1, 'La pregunta no puede estar vacía'),
      }),
    )
    .min(1, 'Debe haber al menos una pregunta'),
})

type FormValues = z.infer<typeof formSchema>

export function CreateEventModal() {
  const [open, setOpen] = useState(false)
  const { mutateAsync: createEvent, isPending } = useCreateEvent()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: '',
      fecha: '',
      preguntas: [{ texto: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'preguntas',
  })

  async function onSubmit(values: FormValues) {
    try {
      await createEvent({
        descripcion: values.descripcion,
        fecha: values.fecha,
        preguntas: values.preguntas.map((p) => p.texto),
      })

      form.reset({
        descripcion: '',
        fecha: '',
        preguntas: [{ texto: '' }],
      })
      setOpen(false)
      toast.success('Evento creado con éxito')
    } catch (error) {
      toast.error('Error al crear el evento')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Crear Evento</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Evento</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del evento..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha y Hora</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Preguntas de la Encuesta</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ texto: '' })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir Pregunta
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`preguntas.${index}.texto`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder={`Pregunta ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {form.formState.errors.preguntas && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.preguntas.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creando...' : 'Guardar Evento'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
