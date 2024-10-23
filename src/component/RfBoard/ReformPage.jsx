import {Route, Routes} from "react-router-dom";
import ReformBoard from "./ReformBoard.jsx";
import ReformDetail from "./ReformDetail.jsx";
import ReformNew from "./ReformNew.jsx";

export default function ReformPage({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/" element={<ReformBoard isLoggedIn={isLoggedIn} />}/>
            <Route path="/:postId" element={<ReformDetail />} />
            <Route path="/write" element={<ReformNew />} />
        </Routes>
    )
}