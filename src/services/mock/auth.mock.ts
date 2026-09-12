/**
 * Datos y lógica mock del módulo de autenticación.
 * Usuario fijo definido acá para efectos de la prueba técnica.
 */
import { simulateRequest } from '../mockApi';

const MOCK_USER = {
  username: 'admin',
  password: 'admin123',
};

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

/**
 * Simula la petición de login contra un backend.
 * Valida credenciales contra el usuario fijo del mock.
 *
 * @param payload - credenciales ingresadas por el usuario
 * @returns promesa con token y username si las credenciales son válidas
 */
export function loginRequest(payload: LoginPayload): Promise<LoginResponse | null> {
  const isValid =
    payload.username === MOCK_USER.username && payload.password === MOCK_USER.password;

  if (!isValid) {
    return simulateRequest(null, { failureRate: 1 });
  }

  return simulateRequest(
    { token: 'fake-jwt-token', username: MOCK_USER.username },
    { delayMs: 500 },
  );
}
