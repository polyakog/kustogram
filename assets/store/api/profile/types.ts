export type UserType = {
  login: string;
  firstName: string;
  lastName: string;
  dateOfBirthday: string;
  city: string;
  userInfo?: string;
  photo?: string;
};

export type AvatarType = {
  formData: FormData;
  avatar: string;
};

export type AuthMeType = {
  email: string;
  id: string;
  login: string;
};
