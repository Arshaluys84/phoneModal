
import { useState, useMemo } from "react";

import { countries, CountryType, initialFlag, initialPhoneNumber } from "../utils/constants";
import { containsText } from "../utils/utils";

import {
    Box,
    FormControl,
    Select,
    MenuItem,
    ListSubheader,
    TextField,
    InputAdornment,
    SelectChangeEvent,
    MenuProps
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { phoneSearchStyles } from "./PhoneSearchStyles";

export const  PhoneSearch = ({ handleCountryCode }: { handleCountryCode: (code: string) => void }) => {

    const [selectedOption, setSelectedOption] = useState(initialPhoneNumber.code);
    const [selectedFlag, setSelectedFlag] = useState(initialFlag);
    const [searchText, setSearchText] = useState("");

    const displayedOptions: CountryType[] = useMemo(
        () => countries.filter((option) => containsText(option.label, searchText)),
        [searchText]
    );

    const { search, list, label, searchinput, select, menuProps, renderProps, adorment } = phoneSearchStyles

    const handleOnChange = (event: SelectChangeEvent<string>) => {

        const country = countries.find(c => c.label === event.target.value)
        if (country) {
            setSelectedOption(country.phone)
            setSelectedFlag(country)
            handleCountryCode(country.phone)
        }
    }
    return (
        <Box sx={ searchinput }>
            <FormControl fullWidth>
                <Select
                    sx={ select }
                    MenuProps={menuProps as Partial<MenuProps>}
                    labelId="search-select-label"
                    id="search-select"
                    value={selectedOption}
                    label=""
                    onChange={handleOnChange}
                    onClose={() => setSearchText("")}
                    renderValue={() => <Box sx={renderProps}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${selectedFlag.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${selectedFlag.code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        {" +"}{selectedOption}
                    </Box>}
                >
                    <ListSubheader sx={search}>
                        <TextField
                            size="small"
                            autoFocus
                            placeholder="Search..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={adorment}>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant="standard"
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key !== "Escape") {
                                    e.stopPropagation();
                                }
                            }}
                        />
                    </ListSubheader>
                    {displayedOptions.map((option, i) => (
                        <MenuItem key={i} value={option.label}>
                            <Box sx={list}>
                                <Box>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        alt=""
                                    />
                                    <Box component="div" sx={ label }>{option.label}</Box>
                                </Box>
                                <span>+{option.phone}</span>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
