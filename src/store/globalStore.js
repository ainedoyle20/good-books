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
  bookSearchResults: {
    "Days Gone Bye": {
      book_id:138398,
      name:"Days Gone Bye",
      cover:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1389233242i/138398._SY75_.jpg",
      url:"https://www.goodreads.com/book/show/138398.Days_Gone_Bye?from_search=true&from_srp=true&qid=tUVsMiTs4R&rank=1",
      authors: [],
      rating:4.27,
      created_editions: 47,
      year: 2004,
    },
  },
  getBookByIdResults: {
    56597885: {
      "book_id": 56597885,
      "name": "Beautiful World, Where Are You",
      "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg",
      "url": "https://www.goodreads.com/book/show/56597885",
      "authors": [
        "Sally Rooney"
      ],
      "rating": 3,
      "pages": 356,
      "published_date": "September 7th 2021",
      "synopsis": "Beautiful World, Where Are You is a new novel by Sally Rooney, the bestselling author of Normal People and Conversations with Friends.Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known sinceBeautiful World, Where Are You is a new novel by Sally Rooney, the bestselling author of Normal People and Conversations with Friends.Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. Alice, Felix, Eileen, and Simon are still young—but life is catching up with them. They desire each other, they delude each other, they get together, they break apart. They have sex, they worry about sex, they worry about their friendships and the world they live in. Are they standing in the last lighted room before the darkness, bearing witness to something? Will they find a way to believe in a beautiful world?"
    },
  },

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

  updateBookSearchResults: (searchTitle, obj, oldSearchResults ) => {
    set({ bookSearchResults: { ...oldSearchResults, [searchTitle]: obj } });
  },

  updateGetBookByIdResults: (newId, obj, oldGetBookByIdResults) => {
    set({ getBookByIdResults: { ...oldGetBookByIdResults, [newId]: obj } });
  },
});

const useGlobalStore = create(
  persist(globalStore, {name: "global"})
);

export default useGlobalStore;
