import { Card } from "react-bootstrap";
import s from "./LogBlock.module.css"

const LogBlock = ({ date, worker, log }) => {
    const logDateFormatter = (date) => {
        let formattedDate = date
        formattedDate = formattedDate.split(" ")
        let dayOfWeek = formattedDate[0]
        let month = formattedDate[1]
        let day = ""
        let time = ""
        let year = ""
        if (formattedDate[2] === "") {
            day = formattedDate[3]
            time = formattedDate[4]
            year = formattedDate[5]
        } else {
            day = formattedDate[2]
            time = formattedDate[3]
            year = formattedDate[4]
        }
        const daysOfWeek = {
            Mon: "Понедельник",
            Tue: "Вторник",
            Wed: "Среда",
            Thu: "Четверг",
            Fri: "Пятница",
            Sat: "Суббота",
            Sun: "Воскресенье",
        }

        const months = {
            Jan: "Января",
            Feb: "Февраля",
            Mar: "Марта",
            Apr: "Апреля",
            May: "Мая",
            Jun: "Июня",
            Jul: "Июля",
            Aug: "Августа",
            Sep: "Сентября",
            Oct: "Октября",
            Nov: "Ноября",
            Dec: "Декабря"
        }

        const outputString = daysOfWeek[dayOfWeek] + " " + day + " " + months[month] + " " + time + " " + year
        console.log(outputString)
        return outputString
    }

    return (
        <Card bg="dark" style={{ color: "white", padding: "5px", marginBottom: "10px", whiteSpace: "pre-line" }}>
            <Card.Body>
                <Card.Title>
                    <div className={s.date}>
                        <i>{logDateFormatter(date)}</i>
                    </div>
                    <div className={s.worker}>
                        <i>{worker}</i>
                    </div>
                </Card.Title>

                <div className={s.log}>
                    {log}
                </div>
            </Card.Body>
        </Card>
    )
}

export default LogBlock;