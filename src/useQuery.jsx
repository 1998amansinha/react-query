import { useQuery } from "@tanstack/react-query";

export default function useReactQuery() {
  const { isPending, data, error } = useQuery({
    queryKey: ["docs"],
    queryFn: () => {
      fetch("https://openlibrary.org/search/authors.json?q=twain").then((res) =>
        res.json()
      );
      if (isPending) return "Loading...";
    
      if (error) return "An error has occured: " + error.message;
    },
  });
  return data
}


