import { AuthorizationRole } from './authorization.model';

export const AuthorizationManager = {
  isErrorCodeIncorrect(code, status) {
    return status === 403 && code === 1;
  },

  isErrorCodeExpired(code, status) {
    return status === 403 && code === 2;
  },

  isAdmin(role) {
    return role.name === 'admin';
  }
};
