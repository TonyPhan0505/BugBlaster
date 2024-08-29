import { toast } from "react-toastify";

const alertStyle = {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "light"
};

export const showErrorAlert = (error) => {
    toast.error(error, alertStyle);
}

export const showSuccessAlert = (message) => {
    toast.success(message, alertStyle);
}

export const showInstructionAlert = (message) => {
    toast.info(message, alertStyle);
}