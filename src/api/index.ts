import { get } from './api';

export type BannerType = { banners: Array<{ imageUrl: string }> };
export const getBanner = () => get<BannerType>('/banner');

export type PersonalizedType = { result: Array<{ name: string; picUrl: string }> };
export const getPersonalized = () => get<PersonalizedType>('/personalized');
