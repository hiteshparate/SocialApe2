
export default {
    palette: {
        primary: {

            main: '#ff4400',
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    customForm: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: 'center',

        },
        icon: {
            height: 50,
            width: 50,
        },
        button: {
            margin: '20px auto 20px auto',
            position: 'relative',
        },
        textField: {
            textAlign: 'center',
            margin: '10px auto 10px auto'

        },
        customError: {
            color: 'red',
            fontSize: '0.8rem'
        },
        small: {
            margin: '10px',
            fontSize: '15px'
        },
        progress: {
            position: 'absolute',
        },
    },
    Profile: {
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        }
    },

    Scream: {
        card: {
            display: 'flex',
            marginBottom: 20
        },

        image: {
            minwidth: 200
        },
        media: {
            height: 140,
            width: 140,
        },
        content: {
            padding: 25,
            objectFit: 'cover'
        },

    },
    ScreamDialog: {
        submitButton: {
            submitButton: "relative",
            float: "right",
            marginTop: 10
        },
        closeButton: {
            position: 'absolute',
            left: '91%',
            top: '6%'
        }
    },
    PostScream: {
        submitButton: {
            position: 'relative',
            float: 'right',
            marginTop: 10
        },
        progressSpinner: {
            position: 'absolute'
        },
        closeButton: {
            position: 'absolute',
            left: '91%',
            top: '6%'
        }
    },

    deleteButton: {
        deleteButton: {
            position: 'absolute',
            left: '2200%',
            top: '10%'
        }
    }

    

}