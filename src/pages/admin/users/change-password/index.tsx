import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@/components/layout/container";

import {
  changePasswordSchema,
  type changePasswordSchemaType,
} from "@/schemas/user";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { InfoIcon, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "@/components/ui/alert";
import { Label } from "@radix-ui/react-label";

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChangePassword = async (data: changePasswordSchemaType) => {
    setLoading(true);
    try {
      const { success, error } = await login(data);
      if (!success) {
        if (error) {
          setLoginError("Erro ao alterar a senha. Verifique as credenciais e tente novamente.");
        } else {
          setLoginError("Houve um problema ao alterar a senha. Tente novamente em alguns instantes.");
        }
      } else {
        navigate("/admin");
      }
    } catch (e) {
      console.error("Houve um erro ao tentar alterar a senha", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container verticalAlign="justify-center">
      <form className="flex flex-col justify-start items-start gap-4 w-full md:max-w-1/4 border-2 p-4 rounded-sm">
        <h2 className="flex justify-center items-center w-full text-center text-xl gap-2 py-4">
          <LockKeyhole />
          Altere a sua senha
        </h2>
        <Label htmlFor="password" className="text-sm ml-2 -mb-2 text-gray-600">
          Insira a sua senha
        </Label>
        <FormField
          id="password"
          type="password"
          placeholder="Informe sua senha"
          {...register("password")}
          error={errors?.password}
          required={true}
        />
        <Label
          htmlFor="new-password"
          className="text-sm ml-2 -mb-2 text-gray-600"
        >
          Nova senha
        </Label>
        <FormField
          id="new-password"
          type="password"
          placeholder="Informe sua senha"
          {...register("newPassword")}
          error={errors?.password}
          required={true}
        />
        <Label
          htmlFor="confirm-password"
          className="text-sm ml-2 -mb-2 text-gray-600"
        >
          Confirme a sua nova senha
        </Label>
        <FormField
          id="confirm-password"
          type="password"
          placeholder="Informe sua senha"
          {...register("confirmPassword")}
          error={errors?.password}
          required={true}
        />
        <Button
          type="submit"
          variant={"default"}
          className="w-full mb-4"
          disabled={loading}
        >
          {loading ? "Aguarde..." : "Entrar"}
        </Button>

        {loginError && (
          <Alert variant="destructive">
            <InfoIcon />
            {loginError}
          </Alert>
        )}
      </form>
    </Container>
  );
};

export default ChangePassword;
