import { Backdrop, Box, Modal } from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	maxHeight: "600px",
	overflowY: "scroll",
	bgcolor: "background.paper",
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
};

interface ModalUtilProps{
    open: boolean
    handleOpen: any
    handleClose: any
    children: React.ReactNode
}

export const ModalUtil: React.FC<ModalUtilProps> = (props) =>{
    return(
        <div>
            <Modal aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={props.open}
				onClose={props.handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}>
					<Box sx={style}>{props.children}</Box>

			</Modal>
        </div>
    )
}