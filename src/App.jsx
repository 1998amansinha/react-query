import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import "./App.css";


const getPost = () =>
fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
  res.json()
)

// useQuery
const App = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPost(),
      // gcTime: 6000
      staleTime: 3000,
      refetchOnWindowFocus: false,
      // retry:3
      // refetchInterval: 3000
  });

  // useMutation

  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "content-type": "application/json; charset=UTF-8" },
      }).then((res) => res.json()),
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
    },
  });

  if (isLoading) return "Loading...";

  if (error || isError) return "An error has occured: " + error.message;

  return (
    <>
      {isPending && <p>Data is being added ...</p>}

      <button
        onClick={() =>
          mutate({
            userId: 1000,
            id: 1000,
            title: "Aman Sinha",
            body: "Lets build a app",
          })
        }
      >
        Add Post
      </button>
      {data?.map((data) => (
        <>
          <h4>ID : {data.id}</h4>
          <h6>Title : {data.title}</h6>
          <p>Paragraph : {data.body}</p>
          <br />
        </>
      ))}
    </>
  );
};

export default App;
