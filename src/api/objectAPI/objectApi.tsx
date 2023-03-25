import { api } from '../api';

interface VHSObject {
  id: number;
  storage_name: string;
  orig_name: string;
  orig_date: string;
  add_date: string;
  billing_pn: string;
  user_name: string;
  notes: string;
}

export const objectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getObjectsByPN: builder.query<VHSObject[], string>({
      query: (pn: string) => `/getobjbypn?billing_pn=${pn}`,
      keepUnusedDataFor: 5,
    }),
    sendFile: builder.mutation<unknown, FormData>({
      query: (data: FormData) => ({
        url: '/new',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetObjectsByPNQuery, useSendFileMutation } = objectsApi;
