import create from "zustand";
import {persist} from "zustand/middleware";

const globalStore = (set) => ({
  userDetails: null,
  otherUserDetails: null,
  navSection: "",

  getUserDetails: async () => {

  },

  getOtherUserDetails: async () => {

  },

  updateNavSection: (navSection) => {
    set({ navSection });
  }
});

const useGlobalStore = create(
  persist(globalStore, {name: "global"})
);

export default useGlobalStore;
