import { api } from '../api';

const url: string = process.env.REACT_APP__BACKEND_URL_AUTH_PART ?? '/auth';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
