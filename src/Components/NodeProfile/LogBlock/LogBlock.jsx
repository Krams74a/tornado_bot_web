import s from "./LogBlock.module.css"

const LogBlock = (props) => {
    return (
        <div className={s.logBlock}>
            <div className={s.date}>
                <i>{props.date}</i>
            </div>
            <div className={s.worker}>
                <i>{props.worker}</i>
            </div>
            <div className={s.log}>
                <b>{props.log}</b>
            </div>
        </div>
    )
}

export default LogBlock;