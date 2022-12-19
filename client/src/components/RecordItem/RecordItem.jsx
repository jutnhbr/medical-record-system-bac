import "./RecordItem.css";
import Markdown from 'markdown-to-jsx';
import {useEffect, useState} from "react";

const RecordItem = ({recordid}) => {

    const [record, setRecord] = useState({md: ""});

    useEffect(() => {
        fetch("http://localhost:3001/records/" + recordid)
            .then((res) => res.text())
            .then((md) => {
                setRecord({ md })
            }
        )
    }, [])


    return (
        <>
            <div className="record-item-container">
                <Markdown children={record.md}/>
            </div>
        </>
    )
}


export default RecordItem;