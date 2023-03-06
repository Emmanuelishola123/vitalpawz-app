import { atom } from 'recoil'
import { IMainCategory } from '@/app/types/CategoryInterface';

export const categoriesAtom = atom<IMainCategory[]>({
  key: 'categories',
  default: []
});