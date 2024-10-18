import {Route, Routes} from "react-router-dom";
import ReformBoard from "./ReformBoard.jsx";
import ReformDetail from "./ReformDetail.jsx";

export default function ReformPage() {
    return (
        <Routes>
            <Route path="/" element={<ReformBoard/>}/>
            <Route path="/:post_id" element={<ReformDetail />} />
        </Routes>
    )
}