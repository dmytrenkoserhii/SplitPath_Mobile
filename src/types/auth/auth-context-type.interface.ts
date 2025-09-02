import { AuthState } from "./auth-state.interface";

export interface AuthContextType extends AuthState {
  refreshUser: () => Promise<void>;
}
