import React, {FC} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useData from "../hooks/useData";

const AppSnackbar: FC = () => {
    const {isOpenSnackbar, closeSnackbar} = useData()
    return (
        <Snackbar
            open={isOpenSnackbar}
            autoHideDuration={6000}
            onClose={closeSnackbar}
        >
            <Alert
                onClose={closeSnackbar}
                severity="success"
                sx={{ width: "100%" }}
            >
                Оплачено!
            </Alert>
        </Snackbar>
    )
}

export default AppSnackbar