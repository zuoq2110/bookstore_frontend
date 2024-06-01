import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import GenreTable from "./GenreTable";
import { ModalUtil } from "../../../user/ModalUtil";
import GenreForm from "./GenreForm";
import RequireAdmin from "../../RequireAmdin";

const GenreManagement = () => {
    const [option, setOption] = useState('')
    const [id, setId] = useState<number>(0);
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const [keyCountReload, setKeyCountReload] = useState();
    return (
        <div className="container p-5">
            <div className="shadow-4-strong rounded p-5">
                <div className="mb-3">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            handleOpenModal()
                            setOption("add")
                        }}
                        startIcon={<AddIcon />}>
                        Thêm thể loại
                    </Button>
                </div>
                <div>
                    <GenreTable
                        setOption={setOption}
                        setId={setId}
                        keyCountReload={keyCountReload}
                        setKeyCountReload={setKeyCountReload}
                        handleOpen={handleOpenModal} />
                </div>
                <ModalUtil
                    open={open}
                    handleClose={handleCloseModal}
                    handleOpen={handleOpenModal}
                >
                    <GenreForm handleClose={handleCloseModal}
                        id={id}
                        option={option}
                        setKeyCountReload={setKeyCountReload}
                    />
                </ModalUtil>
            </div>
        </div>
    )
}

const GenreManagementPage = RequireAdmin(GenreManagement)
export default GenreManagementPage