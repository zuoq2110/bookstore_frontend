import React, { useState } from "react"

interface TextEllipsis {
    text: string;
}
const TextEllipsis: React.FC<TextEllipsis> = (props) => {
    const [showFullText, setShowFullText] = useState(false);

    return (
        <div>
            {showFullText ? <span style={{
                 width: "100%",
                 overflowWrap: "break-word",
                 whiteSpace: "pre-wrap",
                 lineHeight: "20px",
            }}>{props.text}</span> : <span style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 5,
                lineClamp: 5,
                WebkitBoxOrient: "vertical",
                width: "100%",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                lineHeight: "20px",
            }}>
                {props.text}
            </span>}
            {(
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <button className="btn btn-outline-primary text-primary mt-3 "
                        onClick={() => setShowFullText(!showFullText)}>

                        {showFullText ? "Rút gọn" : "Xem thêm"}
                    </button>
                </div>
            )}
        </div>
    )
}
export default TextEllipsis