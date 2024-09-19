import { urls } from '../constants';
import { ITokens } from '../interfaces';
import { IAuth } from '../interfaces/InterfaceAuth';
import { IUser } from '../interfaces/InterfaceUser';
import { IRes } from '../types/resType';
import { ApiService } from './ApiService';

const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';
const AuthService = {
  async login(user: IAuth): Promise<IUser> {
    const { data } = await ApiService.post<ITokens>(urls.auth.login, user);
    this.setTokens(data);
    const { data: me } = await this.getMe();
    return me;
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const { data } = await ApiService.post<ITokens>(urls.auth.refresh, {
      refresh,
    });
    this.setTokens(data);
  },

  getMe(): IRes<IUser> {
    return ApiService.get(urls.auth.getUser);
  },
  async logoutMe(): Promise<void> {
    await ApiService.delete(urls.auth.logout);
    this.deleteTokens();
  },

  setTokens({ refresh, access }: ITokens): void {
    localStorage.setItem(accessTokenKey, access);
    localStorage.setItem(refreshTokenKey, refresh);
  },

  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  },
  getRefreshToken(): string {
    return localStorage.getItem(refreshTokenKey);
  },
  deleteTokens(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  },
};

export { AuthService };
