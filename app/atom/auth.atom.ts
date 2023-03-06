import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { IUserSchema } from 'schemas/account.schema';

type IAuthState = null | {
  token: string;
  user: IUserSchema;
};
const authAtom = atom<IAuthState>({
  key: 'auth',
  default: null,
});

export default authAtom;

export const useAuthState = () => useRecoilState(authAtom);

export const useAuthValue = () => useRecoilValue(authAtom);
