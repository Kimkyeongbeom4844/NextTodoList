import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { List } from "@/types/list";
export const listApi = createApi({
  reducerPath: "listApi",
  tagTypes: ["list"],
  refetchOnFocus: false, // 화면 밖 포커스 후 다시 화면 포커스시 리패치 요청
  refetchOnReconnect: true, // 네트워크 및 response에러 시 리패치 요청
  refetchOnMountOrArgChange: false, // 컴포넌트 마운트 시 리패치 요청
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getList: builder.query<List, null>({
      query: () => `/api/list`,
      providesTags: ["list"],
    }),
    postList: builder.mutation<any, { title: string }>({
      query: ({ title }) => ({
        url: "/api/list",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["list"],
    }),
    deleteList: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `/api/list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["list"],
    }),
  }),
});
export const { useGetListQuery, usePostListMutation, useDeleteListMutation } =
  listApi;
