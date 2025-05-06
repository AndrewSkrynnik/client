import {
  activityOptions,
  legalFormOptions
} from "@/features/auth/common/selectsOptions";
import { CompanyFormProps } from "@/features/auth/types";

import { AuthCheckbox } from "@/components/ui/forms/AuthCheckbox";
import { AuthInput } from "@/components/ui/forms/AuthInput";
import { AuthSelect } from "@/components/ui/forms/AuthSelect";

export const MultiFormCompany = (props: CompanyFormProps) => {
  const { organizationName, legalForm, activity, updateFields, control } =
    props;

  return (
    <>
      <AuthInput
        control={control}
        name="organizationName"
        label="Название организации"
        type="text"
        defaultValue={organizationName}
        onChange={e => updateFields({ organizationName: e.target.value })}
      />
      <AuthSelect
        control={control}
        name="legalForm"
        label="Организационно-правовая форма"
        options={legalFormOptions}
        defaultValue={legalForm}
        onChange={e => updateFields({ legalForm: e.target.value })}
      />
      <AuthSelect
        control={control}
        name="activity"
        label="Вид деятельности"
        options={activityOptions}
        defaultValue={activity}
        onChange={e => updateFields({ activity: e.target.value })}
      />

      <div className="flex w-full flex-col gap-y-2">
        <AuthCheckbox
          control={control}
          name="consent"
          label="Согласие на обработку перс. данных"
          required
        />
        <AuthCheckbox
          control={control}
          name="confirmation"
          label="Подтверждение регистрации"
          required
        />
      </div>
    </>
  );
};
