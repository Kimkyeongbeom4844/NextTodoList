import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { List } from "@/types/list";
export const listApi = createApi({
  reducerPath: "listApi",
  tagTypes: ["list"],
  refetchOnFocus: false, // 화면 밖 포커스 후 다시 화면 포커스시 리패치 요청
  refetchOnReconnect: true, // 네트워크 재 연결시 리패치 요청
  refetchOnMountOrArgChange: false, // 컴포넌트 마운트 시 리패치 요청
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getList: builder.query<List, null>({
      query: () => `/api/list`,
      providesTags: [{ type: "list", id: "GET" }],
    }),
    postList: builder.mutation({
      query: ({ title }) => ({
        url: "/api/list",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: [{ type: "list", id: "GET" }],
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: `/api/list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "list", id: "GET" }],
    }),
  }),
});
export const { useGetListQuery, usePostListMutation, useDeleteListMutation } =
  listApi;
