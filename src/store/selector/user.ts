import { selector } from "recoil";
import { userState } from "../atoms/user";
export const userEmailS = selector({
  key: "userEmailS",
  get: ({ get }) => {
    const state = get(userState);
    return state.userEmail;
  },
});
export const isLoadingS = selector({
  key: "isLoadingS",
  get: ({ get }) => {
    const state = get(userState);
    return state.isLoading;
  },
});
