import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

function App() {

    return (
        <section className='App'>
            <TwitterFollowCard userName='emanuelpesci' initialIsFollowing >
                Emanunel Pesci
            </TwitterFollowCard>
            <TwitterFollowCard userName="kikobeats"  >
                Kiko Beats
            </TwitterFollowCard>
            <TwitterFollowCard userName="midudev" >
                Miguel Angel Dúran
            </TwitterFollowCard>
            <TwitterFollowCard userName='lionelmessi' initialIsFollowing>
                Lionel Messi
            </TwitterFollowCard>
        </section>
    )
}

export default App