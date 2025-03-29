import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";

type Joke = {
  id: string;
  joke: string;
  status: number;
};

export const useDadJoke = routeLoader$(async () => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });

  const data: Joke = await response.json();

  return data;
});

export const useJokeVoteAction = routeAction$((props) => {
  console.log("vote", props);
});

export default component$(() => {
  const dadJokeSignal = useDadJoke();

  const favoriteJokeAction = useJokeVoteAction();

  const isFavoriteSignal = useSignal(false);

  return (
    <section>
      <p>{dadJokeSignal.value.joke}</p>
      <Form action={favoriteJokeAction}>
        <input type="hidden" name="JokeId" value={dadJokeSignal.value.id} />
        <button type="submit" value="up">
          like
        </button>
        <button type="submit" value="down">
          not like
        </button>
      </Form>

      <button
        onClick$={() => (isFavoriteSignal.value = !isFavoriteSignal.value)}
      >
        {isFavoriteSignal.value ? "❤️" : "🤍"}
      </button>
    </section>
  );
});
