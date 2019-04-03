import { AppState } from './app.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  app: AppState;
}
