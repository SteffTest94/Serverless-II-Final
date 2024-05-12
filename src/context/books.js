import React, { useEffect, useState } from "react";
import { generateClient, graphqlOperation } from "aws-amplify/api";
import { v4 as uuidv4 } from "uuid";
import { listBooks } from "./client/queries";
import { processOrder } from "./client/mutations";
const client = generateClient();

const BookContext = React.createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const checkout = async (orderDetails) => {
    const payload = {
      id: uuidv4(),
      ...orderDetails
    };
    try {
      await client.graphql(graphqlOperation(processOrder, { input: payload }));
      console.log("Order is successful");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // Switch authMode to client_KEY for public access
      const { data } = await client.graphql({
        query: listBooks,
        authMode: "client_KEY"
      });
      const books = data.listBooks.items;
      const featured = books.filter((book) => {
        return !!book.featured;
      });
      setBooks(books);
      setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookContext.Provider value={{ books, featured, loading, checkout }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
