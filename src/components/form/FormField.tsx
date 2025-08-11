import React from 'react'
import type { ErrorOption, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Alert } from '../ui/alert'
import { InfoIcon } from 'lucide-react'

interface FormFieldType {
  id: string
  title?: string
  placeholder?: string
  type?: "text" | "email" | "password" | "date"
  error?: ErrorOption
  register?: UseFormRegister<FieldValues>
  required?: boolean
  defaultValue?: string | null
}

const FormField: React.FC<FormFieldType> = ({
  id,
  title,
  placeholder,
  error,
  type = "text",
  required = false,
  defaultValue,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 justify-start items-start w-full">
      {
        title &&
        <Label htmlFor={id}>
          {title}
        </Label>
      }
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        required={required}
        defaultValue={defaultValue ?? undefined}
        {...props}
      />
      {
        error &&
        <Alert variant="destructive">
          <InfoIcon color="red" size={18} />
          {error.message}
        </Alert>
      }
    </div>
  )
}

export default FormField