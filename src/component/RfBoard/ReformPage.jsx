import {Route, Routes} from "react-router-dom";
import ReformBoard from "./ReformBoard.jsx";
import ReformDetail from "./ReformDetail.jsx";
import ReformNew from "./ReformNew.jsx";
import ReformEdit from "./ReformEdit.jsx";
import ReformReport from "./ReformReport.jsx";

export default function ReformPage({ isLoggedInId }) {
    return (
        <Routes>
            <Route path="/" element={<ReformBoard isLoggedInId={isLoggedInId} />}/>
            <Route path="/:postId" element={<ReformDetail isLoggedInId={isLoggedInId}/>} />
            <Route path="/write" element={<ReformNew />} />
            <Route path="/edit/:postId" element={<ReformEdit />} />
        </Routes>
    )
}