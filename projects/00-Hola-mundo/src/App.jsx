import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
  {
    userName: "emanuelpesci",
    name: "Emanuel Pesci",
    isFollowing: true,
  },
  {
    userName: "kikobeats",
    name: "Kiko Beats",
    isFollowing: false,
  },
  {
    userName: "midudev",
    name: "Miguel Angel Dúran",
    isFollowing: false,
  },
  {
    userName: "lionelmessi",
    name: "Lionel Messi",
    isFollowing: true,
  },
];

export default function App() {
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          userName={userName}
          key={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
