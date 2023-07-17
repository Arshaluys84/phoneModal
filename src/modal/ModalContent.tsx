import React, { useEffect, useState } from "react"

import { initialPhoneNumber, InitiatPhoneNumber } from "../utils/constants";
import { Country, useFetch } from "../hooks/useFetch";

import { Box, Button } from "@mui/material"

import { PhoneSearch } from "../phoneModal/PhoneSearch";
import { PhoneInput }  from "../phoneModal/PhoneInput";

import { modalContentStyles } from "./ModalContentStyles";

export const ModalContent = ({ toggle }: { toggle: () => void }): JSX.Element => {

    const { title, subtitle, phone, buttons, cancel, submit } = modalContentStyles
    const [phoneNumber, setPhoneNumber] = useState<InitiatPhoneNumber>(initialPhoneNumber)
    const [countries, setCountries] = useState<Country[]>([])

    const countryList = useFetch()

    const handleCountryCode = (code: string) => {
        setPhoneNumber(prev => ({ ...prev, code }))
    }

    const handlePhoneNumber = (number: string) => {
        setPhoneNumber(prev => ({ ...prev, number }))
    }

    const handlePhoneOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      
        toggle()
    }

    const handleCancel = async () => {
       await setPhoneNumber(initialPhoneNumber)
        toggle()    
    }

    useEffect(() =>{
        if(countryList) setCountries(countryList)
    },[countryList])

    useEffect(() =>{
        console.log(phoneNumber, "phoneNumber");        
    },[phoneNumber])

    return <form onSubmit={handlePhoneOnSubmit}>
        <Box sx={title}>Change phone number</Box>
        <Box sx={subtitle}>Provide new phone number</Box>
        <Box sx={phone}>
            <PhoneSearch handleCountryCode={handleCountryCode}  countries={countries}/>
            <PhoneInput handlePhoneNumber={handlePhoneNumber} />
        </Box>
        <Box sx={buttons} >
            <Button variant="outlined" sx={cancel} onClick={handleCancel}>Cancel</Button>
            <Button variant="outlined" sx={submit} type="submit">Save</Button>
        </Box>
    </form>
}

