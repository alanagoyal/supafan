import Tenor from "tenorjs";
import { useState } from "react";

const tenor = Tenor({
  key: process.env.TENOR_API_KEY!,
  locale: "en_US",
});

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(query);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}
