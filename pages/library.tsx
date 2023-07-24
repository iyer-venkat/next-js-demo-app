import { client } from "@/app/apollo-client";
import { gql } from "@apollo/client";

export async function getStaticProps() {
  let data = { authors: [] };
  try {
    const response = await client.query({
      query: gql`
        query {
          authors {
            id
            name
            books {
              id
              name
            }
          }
        }
      `,
    });

    data = response.data;
  } catch (e) {}

  return {
    props: {
      authors: data?.authors,
    },
  };
}

type Author = {
  id: Number;
  name: string;
  books: Book[];
};
type Book = {
  id: Number;
  name: string;
};

const Library = ({ authors }: { authors: Author[] }) => {
  return (
    <>
      <h1>Welcome to my library!</h1>
      {authors.map((author) => (
        <div key={author.id.toString()}>
          <h2>{author.name}</h2>
          <ul>
            {author.books.map((book) => (
              <li key={book.id.toString()}>{book.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

Library.defaultProps = {
  authors: [],
};

export default Library;
