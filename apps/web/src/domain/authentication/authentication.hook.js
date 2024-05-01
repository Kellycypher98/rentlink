import { useAuthenticationGoogle } from "./hooks/authentication.google.hook";
import { useAuthenticationLogin } from "./hooks/authentication.login.hook";
import { useAuthenticationRegister } from "./hooks/authentication.register.hook";
import { useAuthenticationResetPassword } from "./hooks/authentication.resetPassword.hook";
import { useAuthenticationSendResetPassword } from "./hooks/authentication.sendResetPassword.hook";
import { useAuthenticationToken } from "./hooks/authentication.token.hook";

export const AuthenticationHook = {
  useLogin: useAuthenticationLogin,
  useRegister: useAuthenticationRegister,
  useGoogle: useAuthenticationGoogle,
  useSendResetPassword: useAuthenticationSendResetPassword,
  useResetPassword: useAuthenticationResetPassword,
  useToken: useAuthenticationToken,
};
