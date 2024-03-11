import { useQuery } from "@tanstack/react-query";

import "./App.css";

const App = () => {
  const { isPending, data, error } = useQuery({
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
      {data?.docs.map((docs) => (
        <>
          <h4>Name : {docs.name}</h4>
          <h6>Top Work : {docs.top_work}</h6>
          <br />
        </>
      ))}
    </>
  );
};

export default App;
