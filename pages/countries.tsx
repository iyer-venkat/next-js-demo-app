import { countryClient } from "@/app/apollo-client";
import { gql } from "@apollo/client";

export async function getStaticProps() {
  const { data } = await countryClient.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 15),
    },
  };
}

type Country = {
  name: string;
  code: string;
  emoji: string;
};

const Countries = ({ countries }: { countries: Country[] }) => {
  return (
    <>
      <h1>Welcome to Country list!</h1>
      {countries.map((country) => (
        <div key={country.code} style={{ display: "flex" }}>
          <h3>{country.name}</h3>
          <div>{country.emoji}</div>
        </div>
      ))}
    </>
  );
};

Countries.defaultProps = {
  countries: [],
};

export default Countries;
