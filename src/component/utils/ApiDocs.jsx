import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function ApiDocs() {
    return <SwaggerUI url="https://your-api-url.com/swagger.json" />
}