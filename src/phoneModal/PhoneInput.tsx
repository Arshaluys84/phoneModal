
import React, { useState } from 'react';

import { formatPhone } from '../utils/utils';
import { maskPlaceholder } from '../utils/constants';

import { TextField } from '@mui/material';

import { phoneInputStyles } from './PhoneInputStyles';

export const PhoneInput = ({ handlePhoneNumber }: { handlePhoneNumber: (phone: string) => void }): JSX.Element => {
    const [phone, setPhone] = useState<string>('');

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputPhone = event.target.value;
        const cleanedPhone = inputPhone.replace(/\D/g, '');
        const formattedPhone = formatPhone(cleanedPhone);
        setPhone(formattedPhone);
        handlePhoneNumber(cleanedPhone)

    };
    const { text, inputProps } = phoneInputStyles

    return (
        <TextField
            placeholder={maskPlaceholder}
            sx={text}
            value={phone}
            onChange={handlePhoneChange}
            inputProps={inputProps}
            type="tel"
            variant="outlined"
        />
    );
};


  
