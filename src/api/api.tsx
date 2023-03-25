import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../redux/slices/auth/auth';
import { RootState } from '../redux/store';

const baseUrl =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8012/api';

const refreshUrl = process.env.REACT_APP__BACKEND_URL_AUTH_PART ?? '/auth';

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token !== null) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  // console.log('api@@@:', result);

  if (
    result.error !== undefined &&
    'originalStatus' in result.error &&
    result.error.originalStatus === 403
  ) {
    console.log('Sending refresh token');
    const refreshResult = await baseQuery(refreshUrl, api, extraOptions);
    console.log(refreshResult);

    if (
      (refreshResult?.data as { accesstoken: string } | undefined) !== undefined
    ) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setCredentials({
          ...(refreshResult.data as { accesstoken: string } | undefined),
          user,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
