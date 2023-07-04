import error from './error.hbs'
import './error.css'

export function ServerError() {
    const errorContext = { StatusCode: 500, Text: "Уже исправляем"}
    return error(errorContext);
}
export function NotFoundError() {
    const errorContext = { StatusCode: 404, Text: "Страница не найдена"}
    return error(errorContext);
}