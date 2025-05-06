import { AccountFormProps } from "@/features/auth/types";

import { AuthInput } from "@/components/ui/forms/AuthInput";
import { AuthPasswordInput } from "@/components/ui/forms/AuthPasswordInput";

export const MultiFormAccount = (props: AccountFormProps) => {
  const { username, email, password, updateFields, control } = props;

  return (
    <>
      <AuthInput
        control={control}
        name="username"
        label="Имя пользователя"
        type="text"
        defaultValue={username}
        onChange={e => updateFields({ username: e.target.value })}
      />
      <AuthInput
        control={control}
        name="email"
        label="Email"
        type="email"
        defaultValue={email}
        onChange={e => updateFields({ email: e.target.value })}
      />
      <AuthPasswordInput
        control={control}
        name="password"
        label="Пароль"
        defaultValue={password}
        onChange={value => updateFields({ password: value })}
      />
    </>
  );
};
