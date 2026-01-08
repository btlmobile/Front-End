import { BottleResponseSchema } from '../services/api';

export type RootStackParamList = {
  Home: { guest?: boolean } | undefined;
  Waiting: { theme: 'light' | 'dark'; isGuest?: boolean };
  FoundBottle: { theme: 'light' | 'dark'; bottle: BottleResponseSchema; isGuest?: boolean };
  ReadMessage: { theme: 'light' | 'dark'; bottle: BottleResponseSchema; isGuest?: boolean };
  WriteMessage: { theme: 'light' | 'dark'; isGuest?: boolean };
  LoadingSend: { theme: 'light' | 'dark' };
  Login: undefined;
  Register: undefined;
  Introduce: { theme: 'light' | 'dark' };
  Account: { theme: 'light' | 'dark'; isGuest?: boolean };
  Balo: { theme: 'light' | 'dark'; isGuest?: boolean };
  StoredBottleDetail: { theme: 'light' | 'dark'; stored_bottle_id: string; isGuest?: boolean };
  Test: undefined;
};
