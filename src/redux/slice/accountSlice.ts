import { createSlice } from '@reduxjs/toolkit';

interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshToken: boolean;
  errorRefreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const initialState: IState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: "",
  user: {
    id: "",
    email: "",
    name: "",
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user.id = action?.payload?.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    setLogoutAction: (state, action) => {
      localStorage.removeItem('access_token');
      state.isAuthenticated = false;
      state.user = {
        id: "",
        email: "",
        name: "",
      }
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? "";
    }
  },
});

export const { setUserLoginInfo, setLogoutAction, setRefreshTokenAction } = accountSlice.actions;

export default accountSlice.reducer;
