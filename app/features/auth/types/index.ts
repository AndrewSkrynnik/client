export interface AuthLoginInputs {
  email: string;
  password: string;
}
export interface AuthRegisterInputs extends AuthLoginInputs {
  username: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  legalForm: string;
  activity: string;
  organizationName: string;
  consent: boolean;
  confirmation: boolean;
}
