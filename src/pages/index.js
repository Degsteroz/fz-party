import * as React from "react"
import * as style from '../styles/main.module.scss'
import PlayerCard from "../components/playerCard"
import Logo from "../components/logo";


const IndexPage = () => {
    const player = {
        number: 1,
        lifeCounter: 3
    }
    const player2 = {
        number: 2,
        lifeCounter: 3
    }
    return (
        <main className={style.main}>
            <div className={style.headerContainer}>
                <Logo/>
                FRIENDZONE GAME
            </div>
            <PlayerCard player={player}/>
            <PlayerCard player={player2}/>
        </main>
    )
}

export default IndexPage
