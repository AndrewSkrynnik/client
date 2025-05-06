import * as yup from "yup";

const authSchemaErrors = {
  required: "Обязательное поле",
  min: "Не менее 5 символов",
  max: "Не более 30 символов"
};

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required(authSchemaErrors.required)
    .matches(/\S+@\S+\.\S+/, "Неправильный Email"),
  password: yup
    .string()
    .required(authSchemaErrors.required)
    .min(5, authSchemaErrors.min)
    .max(30, authSchemaErrors.max)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/,
      "Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ (@$!%*?&)."
    )
});

export const signUpSchema = (step: number) => {
  switch (step) {
    case 0:
      return signInSchema.concat(
        yup.object({
          username: yup
            .string()
            .required(authSchemaErrors.required)
            .min(5, authSchemaErrors.min)
            .max(30, authSchemaErrors.max)
            .matches(/^[a-zA-Z0-9\s]*$/, "Только латинские буквы и цифры")
        })
      );
    case 1:
      return yup.object({
        fullName: yup
          .string()
          .required(authSchemaErrors.required)
          .min(5, authSchemaErrors.min)
          .max(30, authSchemaErrors.max)
          .matches(/^[а-яА-ЯёЁ\s]*$/, "Только кириллица"),
        phoneNumber: yup
          .string()
          .required(authSchemaErrors.required)
          .matches(/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/, "Неверное значение"),
        address: yup
          .string()
          .required(authSchemaErrors.required)
          .min(5, authSchemaErrors.min)
          .max(100, "Не более 100 символов")
          .matches(/^[а-яА-ЯёЁ0-9\s.,-/]*$/, "Только кириллица и цифры")
      });
    case 2:
      return yup.object({
        organizationName: yup
          .string()
          .required(authSchemaErrors.required)
          .min(5, authSchemaErrors.min)
          .max(30, authSchemaErrors.max)
          .matches(
            /^[a-zA-Zа-яА-Я0-9\-.,\\|/@'"\[\](){}<>$%^&*_+=\s]*$/,
            "Некорректное название"
          ),
        legalForm: yup.string().required(authSchemaErrors.required),
        activity: yup.string().required(authSchemaErrors.required),
        consent: yup
          .boolean()
          .oneOf([true], "Необходимо согласиться с обработкой данных"),
        confirmation: yup
          .boolean()
          .oneOf([true], "Необходимо подтвердить регистрацию")
      });
    default:
      return yup.object();
  }
};
