import React, { createContext, useContext, useState, ReactNode } from "react";
import { IContext, IEntity } from "./types";

const BookContext = createContext<IContext.BooksContextType | undefined>(undefined);

export function useBookData() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookData must be used within a BookProvider");
  }
  return context;
}

type BookProviderProps = {
  children: ReactNode;
};

export function BookProvider({ children }: BookProviderProps) {
  const [bookData, setBookData] = useState<IEntity.Book[]>([]);

  const value : IContext.BooksContextType = {
    bookData,
    setBookData
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}