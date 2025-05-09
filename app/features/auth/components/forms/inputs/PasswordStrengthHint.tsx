import { rules } from "@/features/auth/common/strengthPasswordRules";
import { PasswordStrengthHintProps } from "@/features/auth/types";

import {
  Rule,
  StrengthBar,
  StyledHint
} from "@/components/styled/StyledPasswordStrengthHint";

export const PasswordStrengthHint = ({
  password,
  strength,
  visible
}: PasswordStrengthHintProps) => {
  if (!visible) return null;

  return (
    <StyledHint elevation={3}>
      <StrengthBar variant="determinate" value={strength} />
      {rules.map(({ regex, label }) => (
        <Rule key={label} met={regex.test(password)}>
          {label}
        </Rule>
      ))}
    </StyledHint>
  );
};
