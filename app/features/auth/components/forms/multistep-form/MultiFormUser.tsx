import { UserFormProps } from "@/features/auth/types";

import { AuthInput } from "@/components/ui/forms/AuthInput";
import { AuthPhoneInput } from "@/components/ui/forms/AuthPhoneInput";

export const MultiFormUser = (props: UserFormProps) => {
  const { fullName, phoneNumber, address, updateFields, control } = props;

  return (
    <>
      <AuthInput
        control={control}
        name="fullName"
        label="Ф.И.О."
        type="text"
        defaultValue={fullName}
        onChange={e => updateFields({ fullName: e.target.value })}
      />
      <AuthPhoneInput
        control={control}
        name="phoneNumber"
        label="Номер телефона"
        defaultValue={phoneNumber}
        onChange={value => updateFields({ phoneNumber: value })}
      />
      <AuthInput
        control={control}
        name="address"
        label="Адрес доставки"
        type="text"
        defaultValue={address}
        onChange={e => updateFields({ address: e.target.value })}
      />
    </>
  );
};
