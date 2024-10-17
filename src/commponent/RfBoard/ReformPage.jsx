import {Route, Routes} from "react-router-dom";
import ReformBoard from "./ReformBoard.jsx";

export default function ReformPage() {
    return (
        <Routes>
            <Route path="/" component={<ReformBoard/>}/>
        </Routes>
    )
}