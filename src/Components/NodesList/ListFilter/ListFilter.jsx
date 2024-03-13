import { React, useState} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const ListFilter = ({statementFilter, directionFilter, setStatementFilter, setDirectionFilter, setSearchFilter}) => {
    
    const [error, setError] = useState()

    return (
        <Card bg="dark" style={{ padding: "20px", marginBottom: "20px", width: "95%", border: "1px solid #4d5154", borderRadius: "0" }}>
                <Form onSubmit={(e) => {
                    const submitText = e.target.search.value
                    const regex1 = new RegExp('[0-9]|,|-');
                    let isCorrect = regex1.test(submitText)
                    e.preventDefault();
                    if (isCorrect) {
                        setSearchFilter(e.target.search.value)
                        setError()
                    } else {
                        setError("Допускаются только цифры, тире, запятая")
                    }
                    
                }} data-bs-theme="dark" style={{ color: "white", display: "flex", gap: "10px" }}>
                    <Form.Group controlId="statement">
                        <Form.Label>Фильтр</Form.Label>
                        <Form.Select onChange={(e) => setStatementFilter(e.target.value)} value={statementFilter} aria-label="Select statement">
                            <option value="">Все узлы</option>
                            <option value="работает">🟢 Работает</option>
                            <option value="умер">🔴 Умер</option>
                            <option value="нужно обслужить">🟡 Нужно обслужить</option>
                            <option value="ожидает возврата">🔵 Ожидает возврата</option>
                            <option value="готов к установке">🟣 Готов к установке</option>
                            <option value="ожидает ремонта">🟠 Ожидает ремонта</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="direction">
                        <Form.Label>Направление</Form.Label>
                        <Form.Select onChange={(e) => setDirectionFilter(e.target.value)} value={directionFilter} aria-label="Select direction">
                            <option value="normal">Обычное</option>
                            <option value="reverse">Реверс</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Поиск узлов</Form.Label>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Form.Control type="text" id="search" placeholder="001, 002-048, 57" aria-describedby="search" />
                            <Button type="submit">Поиск</Button>
                        </div>
                        {error && <Alert style={{marginTop: "5px"}} variant="danger">{error}</Alert>}
                    </Form.Group>
                </Form>
            </Card>
    )
}

export default ListFilter