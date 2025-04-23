import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

const Home = async () => {
  // Fetch the latest 10 books from the database
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  // Handle empty latestBooks array
  if (latestBooks.length === 0) {
    return <p>No books available.</p>;
  }

  // Ensure latestBooks[0] exists before rendering BookOverview
  const latestBook = { ...latestBooks[0], userId: "00000000-0000-0000-0000-000000000000" }; // Add a default userId

  return (
    <>
      {/* Display BookOverview with the first book */}
      <BookOverview {...latestBook} />

      {/* Display BookList with the rest of the books */}
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
