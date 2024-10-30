import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "/src/css/RfBoard/ReformAnnouncement.css";

const ReformAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await fetch('http://localhost:8080/api/announcement/latest',{
                headers: {
                    'Accept':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data)
            setAnnouncements(data);
        };

        fetchAnnouncements();
    }, []);

    return (
        <>
            {announcements.length > 0 ? (  // 배열의 길이를 확인
                    announcements.map(announcement => (
                        <tr key={announcement.announcementId} className={"table-info"}>
                            <td>{announcement.category && announcement.category === "ANNOUNCEMENT" ? "공지" : null}</td>
                            <td>{null}</td>
                            <td>
                                <Link className={"link"} to={`/announcement/${announcement.announcementId}`} state={{announcement}}>
                                        {announcement.title}
                                </Link>
                            </td>
                            <td>{announcement.userId}</td>
                            <td>{announcement.readCount}</td>
                            <td>{announcement.commentCount}</td>
                            <td>{null}</td>
                            <td>{new Date(announcement.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))
            ) : (
                <></>
            )}
        </>
    );
};

export default ReformAnnouncement;