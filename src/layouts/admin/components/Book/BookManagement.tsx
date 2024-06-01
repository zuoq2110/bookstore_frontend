import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import BookTable from "./BookTable";
import { ModalUtil } from "../../../user/ModalUtil";
import BookForm from "./BookForm";
import { useState } from "react";

const BookManagement: React.FC = () => {
    const [keyCountReload, setKeyCountReload] = useState(0)
    const [open, setOpen] = useState(false)
    const [option, setOption] = useState("")
    const [id, setId] = useState<any>()
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="container p-5">
            <div className="shadow-4 rounded p-5">
                <div className="mb-3">
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setOption("add")
                            handleOpen()
                        }}>
                        Thêm sách
                    </Button>
                </div>
                <div>
                    <BookTable
                        setOption={setOption}
                        setId={setId}
                        handleOpen={handleOpen}
                        keyCountReload={keyCountReload}
                        setKeyCountReload={setKeyCountReload} />
                </div>
            </div>
            <ModalUtil
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
            >
                <BookForm
                    handleClose={handleClose}
                    setKeyCountReload={setKeyCountReload}
                    keyCountReload={keyCountReload}
                    option={option}
                    maSach={id} />
            </ModalUtil>
        </div>
    )
}

export default BookManagement