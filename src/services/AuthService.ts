import { urls } from '../constants';
import { IAuth, InterfeceResponceLogin, ITokens, IUser } from '../interfaces';

import { ApiService } from './ApiService';
import { IRes } from '../types';

const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';
const AuthService = {
  async login(user: IAuth): Promise<IUser> {
    const { data } = await ApiService.post<InterfeceResponceLogin>(
      urls.auth.login,
      user,
    );
    this.setTokens({
      access: data.tokens.accessToken,
      refresh: data.tokens.refreshToken,
    });

    const { data: me } = await this.getMe();
    return me;
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const { data } = await ApiService.post<ITokens>(urls.auth.refresh, {
      refresh,
    });
    this.setTokens({
      access: data.accessToken,
      refresh: data.refreshToken,
    });
  },

  getMe(): IRes<IUser> {
    return ApiService.get(urls.auth.getUser);
  },
  async logoutMe(): Promise<void> {
    await ApiService.delete(urls.auth.logout);
    this.deleteTokens();
  },

  setTokens({ access, refresh }: { access: string; refresh: string }): void {
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
