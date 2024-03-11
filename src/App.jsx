import { useQuery } from "@tanstack/react-query";

import "./App.css";

const App = () => {
  const { isPending, docs, error } = useQuery({
    queryKey: ["docs"],
    queryFn: () =>
      fetch("https://openlibrary.org/search/authors.json?q=twain").then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occured: " + error.message;

  return (
    <>
    {docs.map((docs) => 
    <>
    {docs.name}
    </>
    )}
    </>
  );
};

export default App;
