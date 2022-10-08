import create from "zustand/react";
import {persist} from "zustand/middleware";

const globalStore = (set) => ({
  userDetails: null,
  otherUserDetails: null,

  getUserDetails: async () => {

  },

  getOtherUserDetails: async () => {

  }
});

const useGlobalStore = create(
  persist(globalStore, {name: "global"})
);

export default useGlobalStore;
