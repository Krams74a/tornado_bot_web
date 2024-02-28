import s from "./LogBlock.module.css"

const LogBlock = ({date, worker, log}) => {
    return (
        <div className={s.logBlock}>
            <div className={s.date}>
                <i>{date}</i>
            </div>
            <div className={s.worker}>
                <i>{worker}</i>
            </div>
            <div className={s.log}>
                <b>{log}</b>
            </div>
        </div>
    )
}

export default LogBlock;