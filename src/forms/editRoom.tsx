import { Controller, useForm } from 'react-hook-form'

import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRooms } from '@/hooks/useRooms'
import type { Room } from '@/types/rooms'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { RoomSchema, type RoomSchemaType } from '@/schemas/room'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Constants } from '@/types/supabase'

const EditRoom = ({activeRoom, close }: { activeRoom: Room, close: () => void }) => {
  const { updateRoom, loading } = useRooms()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<RoomSchemaType>({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      ...activeRoom
    }
  })

  const HandleUpdateRoom = async (data: RoomSchemaType) => {
    const {success, message} = await updateRoom({id: activeRoom.id, ...data})
    if (success) {
      toast.success(message)
    } else{
      toast.error(message)
    }    
    close()
  }

  return (
    <>
      <form onSubmit={handleSubmit(HandleUpdateRoom)} className="flex flex-col gap-6">
<FormField
          id="name"
          title="Nome do espaço"
          {...register("name")}
          error={errors.name}
        />
        <FormField
          id="number"
          title="Número da Sala"
          {...register("number")}
          error={errors.number}
        />
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Local do Espaço</Label>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Localização do espaço" />
                </SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.location.map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.location && (
            <span className="text-sm text-red-500">{errors.location.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Tipo de Espaço</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de Espaço" />
                </SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.room_type.map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <span className="text-sm text-red-500">{errors.type.message}</span>
          )}
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Aguarde..." : "Cadastrar"}</Button>
      </form>
    </>
  )
}

export default EditRoom