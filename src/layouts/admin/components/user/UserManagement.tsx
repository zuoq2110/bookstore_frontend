import { useState } from "react";
import RequireAdmin from "../../RequireAmdin"
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ModalUtil } from "../../../user/ModalUtil";
import { UserTable } from "./UserTable";
import UserForm from "./UserForm";

const UserManagement = () => {
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
                        Thêm người dùng
                    </Button>
                </div>
                <div>
                    <UserTable
                        setOption={setOption}
                        setId={setId}
                        keyCountReload={keyCountReload}
                        setKeyCountReload={setKeyCountReload}
                        handleOpenModal={handleOpenModal} />
                </div>
                <ModalUtil
                    open={open}
                    handleClose={handleCloseModal}
                    handleOpen={handleOpenModal}
                >
                    <UserForm
                        handleClose={handleCloseModal}
                        id={id}
                        option={option}
                        setKeyCountload={setKeyCountReload}
                    />
                </ModalUtil>
            </div>
        </div>
    )
}

const UserManagementPage = RequireAdmin(UserManagement)
export default UserManagementPage