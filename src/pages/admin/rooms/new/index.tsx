import FormField from "@/components/form/FormField"
import Container from "@/components/layout/container"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRooms } from "@/hooks/useRooms"
import { RoomSchema } from "@/schemas/room"
import type { RoomSchemaType } from "@/schemas/room"
import type { SupabaseResponse } from "@/types/rooms"
import { Constants } from "@/types/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { InfoIcon } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

const NewRoom = () => {
  const { addRoom, loading } = useRooms()
  const [status, setStatus] = useState<SupabaseResponse | null>(null)
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<RoomSchemaType>({
    resolver: zodResolver(RoomSchema)
  })

  const createRoom = async (data: RoomSchemaType) => {
    console.log('creating room')
    const response = await addRoom(data)
    setStatus(response)
  }

  return (
    <Container align="items-center">
      <form className="default-form" onSubmit={handleSubmit(createRoom)}>
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
        <Button type="submit">
          {loading ? "Cadastrando" : "Cadastrar Espaço"}
        </Button>
        {
          !loading && status?.message &&
          <Alert variant={status?.success ? "default" : "destructive"} className="mt-4">
            <InfoIcon />
            {status.message}
          </Alert>
        }
      </form>
    </Container>
  )
}

export default NewRoom