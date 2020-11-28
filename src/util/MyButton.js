import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

function MyButton(children, onClick, tip, btnClassName, tipClassName) {
    return (
        <Tooltip title={tip} className={tipClassName}>
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>

        </Tooltip>
    )
}

export default MyButton
