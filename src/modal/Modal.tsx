import { ReactNode } from "react";

import { Box } from "@mui/material";

import { modalStyles } from "./ModalStyles";

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export function Modal({ children, isOpen, toggle }: ModalType) {

const { overlay, modalBox } = modalStyles    

    return (
        <>
            {isOpen && (
                <Box sx={overlay} onClick={toggle}>
                    <Box onClick={(e) => e.stopPropagation()} sx={modalBox}>
                        {children}
                    </Box>
                </Box>
            )}
        </>
    );
}