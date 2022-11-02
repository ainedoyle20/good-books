import create from "zustand";
import {persist} from "zustand/middleware";

const globalStore = (set) => ({
  user: null,
  userDetails: null,
  allUsers: [],
  navSection: "",
  sidebarActiveOption: "",
  publicGroups: [],
  allGroups: [],

  addUser: (user) => {
    set({ user: user });
  },

  removeUser: () => {
    set({ user: null });
  },

  addUserDetails: (userObj) => {
    set({ userDetails: userObj });
  },

  removeUserDetails: () => {
    set({ userDetails: null });
  },

  updateAllUsers: (members) => {
    set({ allUsers: members });
  },

  updatePublicGroups: (publicGroups) => {
    set({ publicGroups });
  },

  updateAllGroups: (allGroups) => {
    set({ allGroups });
  },

  updateNavSection: (navSection) => {
    set({ navSection });
  },

  updateSidebarActiveOption: (option) => {
    set({ sidebarActiveOption: option });
  },
});

const useGlobalStore = create(
  persist(globalStore, {name: "global"})
);

export default useGlobalStore;
