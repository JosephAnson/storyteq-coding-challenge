import { defineStore } from "pinia";

interface BookItem {
  title: string;
  author: string;
}

interface BookStoreState {
  selectedBook: string;
  books: BookItem[];
}

export const useBookStore = defineStore("book", {
  state: (): BookStoreState => ({
    selectedBook: "",
    books: [
      {
        title: "Don Quixote",
        author: "Miguel De Cervantes",
      },
      {
        title: "Pilgrim's Progress",
        author: "John Bunyan",
      },
      {
        title: "Robinson Crusoe",
        author: "Daniel Defoe",
      },
      {
        title: "Gulliver's Travels",
        author: "Jonathan Swift",
      },
      {
        title: "Tom Jones",
        author: "Henry Fielding",
      },
      {
        title: "Clarissa",
        author: "Samuel Richardson",
      },
      {
        title: "Tristram Shandy",
        author: "Laurence Sterne",
      },
    ],
  }),
});
