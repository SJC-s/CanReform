import {Route, Routes} from "react-router-dom";
import ReformBoard from "./ReformBoard.jsx";
import ReformDetail from "./ReformDetail.jsx";
import ReformNew from "./ReformNew.jsx";

export default function ReformPage({ isLoggedInId }) {
    return (
        <Routes>
            <Route path="/" element={<ReformBoard isLoggedInId={isLoggedInId} />}/>
            <Route path="/:post_id" element={<ReformDetail isLoggedInId={isLoggedInId}/>} />
            <Route path="/write" element={<ReformNew />} />
        </Routes>
    )
}