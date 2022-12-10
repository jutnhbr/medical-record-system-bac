import "./RecordItem.css";
import Markdown from 'markdown-to-jsx';
import {useEffect, useState} from "react";

const RecordItem = () => {

    const [record, setRecord] = useState({md: ""});

    // TODO: Fetch record path from API

    useEffect(() => {
        sessionStorage.setItem("id", "12345678")
        // GET request using fetch inside useEffect React hook to get record
        fetch("http://localhost:3000/data/records/record" + sessionStorage.getItem("id") + ".md")
            .then(async (res) => {
                const record = await res.json();
                setRecord(record);
            }
        )
    }, [])


    return (
        <>
            <div className="record-item-container">
                <Markdown>{record.md}</Markdown>
            </div>
        </>
    )
}


export default RecordItem;