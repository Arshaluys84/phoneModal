import React, { useState } from "react"

import { initialPhoneNumber } from "../utils/constants";

import { Box, Button } from "@mui/material"

import { PhoneSearch } from "../phoneModal/PhoneSearch";
import { PhoneInput }  from "../phoneModal/PhoneInput";

import { modalContentStyles } from "./ModalContentStyles";

export const ModalContent = ({ toggle }: { toggle: () => void }): JSX.Element => {

    const { title, subtitle, phone, buttons, cancel, submit } = modalContentStyles
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)

    const handleCountryCode = (code: string) => {
        console.log(code, "code");
        setPhoneNumber(prev => ({ ...prev, code }))
    }

    const handlePhoneNumber = (number: string) => {
        console.log(number, "code");
        setPhoneNumber(prev => ({ ...prev, number }))
    }

    const handlePhoneOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(phoneNumber, "phoneNumber");
        toggle()
    }

    const handleCancel = () => {
        setPhoneNumber(initialPhoneNumber)
        toggle()
        console.log(phoneNumber, "phoneNumber");
    }

    return <form onSubmit={handlePhoneOnSubmit}>
        <Box sx={title}>Change phone number</Box>
        <Box sx={subtitle}>Provide new phone number</Box>
        <Box sx={phone}>
            <PhoneSearch handleCountryCode={handleCountryCode} />
            <PhoneInput handlePhoneNumber={handlePhoneNumber} />
        </Box>
        <Box sx={buttons} >
            <Button variant="outlined" sx={cancel} onClick={handleCancel}>Cancel</Button>
            <Button variant="outlined" sx={submit} type="submit">Save</Button>
        </Box>
    </form>
}

