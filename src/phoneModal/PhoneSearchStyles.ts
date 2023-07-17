

export const phoneSearchStyles = {
    search: {
        borderRadius: "6px",
        display: "flex",
        marginBottom: "5px",
    },

    list: {
        width: "240px",
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "12px",
        fontSize: "14px",
        fontWeight: "400"
    },

    countryLabel: {
        display: 'inline',
        marginLeft: "10px"
    },

    searchinput: {
        width: "106px"
    },

    select: {
        height: "40px"
    },

    menuProps: {
        autoFocus: false,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },

        PaperProps: {
            style: {
                maxHeight: '260px',
                maxWidth: "260px",
                marginTop: "5px"
            },
        },
    },

    renderProps: {
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center"
    },

    adorment: { 
        marginBottom: "5px"
     }
}