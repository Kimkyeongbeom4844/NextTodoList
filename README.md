# Next13 투두리스트

## 🔎Introduce

```
Next13을 학습할겸 만들어본 투두리스트
```

## ⛏ Development Dependencies

```
Next13
RTK
typescript
<!-- mysql2 -->
```

## 🚀 Deploy

```
vercel
```

## 👨‍💻 Developer

```
kimkyeongbeom4844
```

## 📃 Note

- ## react-redux

`Next`에서 `Redux`를 적용하려면 `Provider`를 담당하는 임의의 래퍼 컴포넌트를 만들면 된다

그리고 `Provider` 래퍼 컴포넌트에 `RootLayout`의 `children`을 `Props`로 넘겨주면 끝

```typescript
// @/stores/Providers.tsx -> Provider는 존재하므로 이름은 Providers로 지엇다
"use client";

import { Provider } from "react-redux";
import { store } from "@/stores";

export default function Providers({ children } : { children : React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}


// @/app/layout.tsx
import "./reset.css";
import "./global.css";
import styles from "./layout.module.css";
import Providers from '@/stores/Providers';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title : '~~',
  description : '~~',
};

export default function RootLayout({ children } : { children : React.ReactNode }) {
  return (
    <html lang='kr'>
      <body>
        <Header/>
        <main>
          <Provider>{ children }</Providers>
        </main>
        <Footer/>
      </body>
    </html>
  )
}
```

이제 첫 랜더링은 SSR방식으로 이후는 CSR방식으로 처리할 수 있다

- ## @reduxjs/toolkit
  줄여서 `RTK`라고 부르며 추가적으로 제공해주는 `RTK Query`를 통해 비동기 처리를 쉽게 할 수 있다.

공식문서를 보면 RTK는 `stores/features`내부에 RTK Query는 `stores/services`내부에 배치되어 있다.

```bash
stores---- features - exampleSlice.ts
        |- services - exampleApi.ts
        |- store.ts
```

개인적으로 RTK보다 [`RTK Query`](https://redux-toolkit.js.org/rtk-query/overview)쪽이 이해하는데 꽤 걸렸다.

```typescript
// @/stores/features/list.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // RTK에서 제공해주는 payload타입

type InitialState = {
  list: (string | number)[];
};

const initialState: InitialState = {
  list: [],
};

const listSlice = createSlice({
  // 공식문서에는 listSlice자체도 export하는데 어디쓰는지 모르겟다..
  name: "list",
  initialState,
  reducers: {
    // RTK에서는 자체적으로 immer라이브러리를 내장하므로 불변성 걱정 안해도 된다.
    addList: (state, action: PayloadAction<string | number>) => {
      state.list.push(action.payload);
    },
    deleteList: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
  },
});

export const { addList, deleteList } = listSlice.actions; // 디스패치에서 써먹을 action들 export
export default listSlice.reducer; // 메인store에 가져다쓸 reducer export

// @/stores/services/listApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // react에서 쓸꺼면 끝에 /react를 붙이면 된다

export const listApi = createApi({
  reducerPath: "listApi", // createSlice의 name이라 생각하자
  tagTypes: ["list"], // 캐시 키워드 배열
  refetchOnFocus: false, // 화면 밖 포커스 후 다시 화면 안 포커스시 리패치 여부
  refetchOnReconnect: true, // 패치 요청 실패 및 에러 또는 네트워크 재 연결 시 리패치 여부
  refetchOnMountOrArgChange: false, // 컴포넌트 마운트 시 리패치 여부
  baseQuery: fetchBaseQuery({ baseUrl: "" }), //기본 Api 요청 url(next에서는 자기자신에게 요청하므로 ''를 선언)
  endPoints: (builder) => ({
    //endPoints내부 값들은 use+이름+메소드의 형식으로 Hook이 정의됨
    getList: builder.query<any, null>({
      //.query는 get요청 담당
      query: () => "/api/list",
      providesTags: ["list"], //.query는 providesTags를 사용하며 여기에 의존성 tag를 주입
    }),
    postList: builder.mutation<any, { title: string }>({
      query: ({ title }) => ({
        url: "/api/list",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["list"], //.mutation을 실행한 뒤 GET담당 endPoints들 중 providesTags에 list가 포함된 endPoints들을 재실행
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
  listApi; //Hook들을 다른 곳에서 사용할 수 있도록 export

// @/stores/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react"; // 선택사항인데 refetchOnFocus 또는 refetchOnReconnect를 사용 시 쓰는 것
import { list } from "./features/list";
import { listApi } from "./services/listApi";

export const store = configureStore({
  reducer: {
    list,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // useSelector의 state의 type
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch; // useDispatch의 타입
```
