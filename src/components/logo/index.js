import * as React from "react"
import * as style from'./logo.module.scss'

const Logo = () => {
    return <img
        className={style.logo}
        src={'https://upload.wikimedia.org/wikipedia/commons/8/86/Triforce.svg'}
    />
}

export default Logo
