import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationContext } from "./contexts/NotificationContext";

const App = () => {
  const { setNotification } = useNotificationContext();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    data: anecdotes,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecdotes = currentAnecdotes.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
      queryClient.setQueriesData("anecdotes", updatedAnecdotes);
      setNotification(`anecdote  ${updatedAnecdote.content} voted`);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isPending) {
    return <div>loading anecdotes...</div>;
  }

  if (isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
