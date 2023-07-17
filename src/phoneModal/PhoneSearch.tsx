import { useState, useEffect, useMemo } from "react";

import { initialFlag } from "../utils/constants";
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
import { Country } from "../hooks/useFetch";


export const PhoneSearch = ({ handleCountryCode, countries }: { handleCountryCode: (code: string) => void; countries: Country[] }) => {

    const initialState = "Poland"
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedFlag, setSelectedFlag] = useState<{code: string}>(initialFlag);
    const [searchText, setSearchText] = useState<string>("");

    const displayedOptions: Country[] = useMemo(
        () => countries.filter((option) => containsText(option.label, searchText)),
        [searchText, countries]
    );

    const { search, list, countryLabel, searchinput, select, menuProps, renderProps, adorment } = phoneSearchStyles

    const handleOnChange = (event: SelectChangeEvent<string>) => {

        const country = countries?.find(c => c.label === event.target.value)
        if (country) {
            setSelectedCountry(country.label)
            setSelectedFlag(country)
            handleCountryCode(country.phone)
        }
    }
    useEffect(() => {
        const matchedOption = countries.find(({ label }) => label === initialState);
        if (matchedOption) {
            setSelectedCountry(matchedOption.label);
        } else if (countries.length > 0) {
            setSelectedCountry(countries[0].label);
        }
    }, [countries]);

    return (
        <Box sx={searchinput}>
            <FormControl fullWidth>
                <Select
                    sx={select}
                    MenuProps={menuProps as Partial<MenuProps>}
                    labelId="search-select-label"
                    id="search-select"
                    value={selectedCountry}
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
                        {countries?.filter(country => country.label === selectedCountry)[0]?.phone}
                    </Box>
                    }
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
                    {displayedOptions ? displayedOptions.map(({ label, phone, code }) => (
                        <MenuItem key={code} value={label}>
                            <Box sx={list}>
                                <Box>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
                                        alt=""
                                    />
                                    <Box component="span" title={label} sx={countryLabel}>{label.length > 15 
                                    ? label.slice(0,15) + "..."
                                    : label }</Box>
                                </Box>
                                <span title={phone}>{phone.length > 5 
                                ? phone.slice(0,5)
                                : phone}</span>
                            </Box>
                        </MenuItem>
                    )) : <MenuItem>Loading...</MenuItem>}
                </Select>
            </FormControl>
        </Box>
    );
}
