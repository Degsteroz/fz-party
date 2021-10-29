import * as React from 'react'
import { useState } from 'react'
import * as style from '../styles/main.module.scss'

const IndexPage = () => {
    const tempPlayers = []
    const [initialPlayerEntered, setInitialPlayerEntered] = useState(false)
    const [players, setPlayers] = useState(tempPlayers)
    const [showWheel, setShowWheel] = useState(false)
    const [wheelValues, setWheelValues] = useState([])

    function makeLifeString (lifeCount) {
        let lives = ''

        for(let i = 1; i <= lifeCount; i++) {
            lives += '⟁'
        }
        return lives
    }

    function getAlivePlayersNumbers () {
        return players.map(player => player.number)
    }

    function changeLifeCount(count, playerId) {
        const tempPlayers = players
        const playerIndex = tempPlayers.findIndex(player => player.id === playerId)

        tempPlayers[playerIndex].life = tempPlayers[playerIndex].life + count
        if (tempPlayers[playerIndex].life === 0) {
            wheelValues.splice(
                wheelValues.findIndex((playerNumber) => playerNumber === playerId + 1),
                1,
            )
        }
        tempPlayers.sort((player1, player2) => player2.life - player1.life)

        const filteredPlayers = tempPlayers.filter(player => player.life)

        setPlayers(filteredPlayers)
    }

    const initialPlayersComponent = function () {
        let inputValue

        function handleValueChange(value) {
            inputValue = value
        }

        function handleSetPlayerButton(playersCount) {

            const transformPlayersCount = Number(playersCount)

            for (let i = 0; i < transformPlayersCount; i++) {
                tempPlayers.push(
                    {
                        id: i,
                        number: i + 1,
                        life: 3,
                        wasPlayed: false
                    }
                )
            }

            setPlayers(tempPlayers)
            setInitialPlayerEntered(true)
            setWheelValues(getAlivePlayersNumbers())

        }
        return (
            <div className={style.initialPlayersComponent}>
                КОЛИЧЕСТВО ИГРОКОВ
                <input
                    className={style.initialPlayersComponent__input}
                    type={'text'}
                    placeholder={'2 - 99'}
                    value={inputValue}
                    onChange={
                        (event) => handleValueChange(event.target.value)
                    }
                />
                <button
                    onClick={() => handleSetPlayerButton(inputValue)}
                >
                    ЗАПУСТИТЬ ИГРУ
                </button>
            </div>
        )
    }

    const playersComponent = function () {
        return (
            <div>
                {players.length && (
                    <div className={style.playersCount}>
                        Осталось игроков: <span>{players.length}</span>
                    </div>
                )}

                <div className={style.playersContainer}>

                    {players.map((item) => (
                        <div className={`${style.player} ${item.wasPlayed ? (style.played) : ''}`}>
                            <div>Игрок <span className={style.player__number}>{item.number}</span>:</div>
                            <span className={style.player__lifeCount}>{makeLifeString(item.life)}</span>
                            <div className={style.player__buttonsContainer}>
                                <button onClick={() => changeLifeCount(1, item.id)}>+</button>
                                <button onClick={() => changeLifeCount(-1, item.id)}>-</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const wheelComponent = function () {
        function getRandomPlayerNumber () {
            const randomPlayerNumber = wheelValues[[Math.floor(Math.random() * wheelValues.length)]]
            const randomPlayerNumberIndex = wheelValues.findIndex(item => item === randomPlayerNumber)

            wheelValues.splice(randomPlayerNumberIndex, 1)
            if (randomPlayerNumber) {
                addClassToPlayer(randomPlayerNumber)
            }
            return randomPlayerNumber || 'Ведущий'
        }

        function handleCloseButton() {
            setShowWheel(false)
            if (!wheelValues.length) {
                setWheelValues(getAlivePlayersNumbers())
                players.forEach((player) => player.wasPlayed = false)
            }
        }

        function addClassToPlayer(playerNumber) {
            const index = players.findIndex(player => player.number === playerNumber)
            players[index].wasPlayed = true
        }

        const [firstPlayer, secondPlayer] = [getRandomPlayerNumber(), getRandomPlayerNumber()]

        return (
            <div
                className={style.randomPlayerContainer}
            >
                <div
                    className={`${style.randomPlayerContainer__number} ${style.firstNumberAnimation}`}
                >
                    {firstPlayer}
                </div>
                <div className={style.randomPlayerContainer__number}>:</div>
                <div
                    className={`${style.randomPlayerContainer__number} ${style.secondNumberAnimation}`}
                >
                    {secondPlayer}
                </div>

                <button
                    onClick={handleCloseButton}
                    className={style.randomPlayerContainer__button}
                >
                    X
                </button>
            </div>
        )
    }
    return (
        <main className={style.main}>
            <div
                className={style.headerContainer}
            >
                <button
                    className={style.headerContainer__logo}
                    onClick={() => {
                        setShowWheel(true)
                    }}
                >
                    <img src={'https://fontmeme.com/permalink/211029/0e086031584dee032f5fb377e426b884.png'}/>
                </button>
            </div>

            { !initialPlayerEntered
                ? initialPlayersComponent()
                : playersComponent()
            }
            {showWheel && wheelComponent()}
        </main>
    )
}

export default IndexPage