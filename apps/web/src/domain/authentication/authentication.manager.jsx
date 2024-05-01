export const AuthenticationManager = {
  export function isErrorLoggedOut(code, status) {
    return status === 401 && code === 0
  }
}
