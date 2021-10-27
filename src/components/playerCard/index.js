import * as React from "react"
import * as style from './playerCard.module.scss'
import {useState} from "react"


const PlayerCard = (props) => {
    const { player } = props
    const [life, setLife] = useState(player.lifeCounter | 0)
    const triangles = ['▲', '△', '⟁']

    const getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    const lifeCounter = []
    lifeCounter.length = life
    lifeCounter.fill('', 0, life)

    const changeLifeCount = function (num) {
        setLife(life + num)
    }

    return life !== 0 && (
        <div className={style.playerCard}>
            <div className={style.title}>Игрок {player.number}:</div>
            <div className={style.lifeCounterWrapper}>
                {
                    lifeCounter.map(() => {
                        const index = Math.floor(getRandomArbitrary(0, 3))
                        return (
                            <div className={style.triangle}>{triangles[index]}</div>
                        )
                    })
                }
            </div>
            <button
                onClick={() => changeLifeCount(1)}
            >
                +
            </button>
            <button
                onClick={() => changeLifeCount(-1)}
            >
                -
            </button>
        </div>
    )
}

export default PlayerCard
