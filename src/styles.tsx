import { Grid, ImageListItem, styled, Typography } from '@mui/material'
import React from 'react'

export const StyledImageListItem = styled(ImageListItem)`
    border: 1px solid black;
    width: 200px;
    :hover {
        box-shadow: 0 0 2px #1976d2;
        border: 1px solid #1976d2;
    }
`

export const StyledContainer = styled(Grid)`
    padding-top: 5rem;
    padding-left: 10rem;
    padding-right: 10rem;
`

export const StyledDialogGrid = styled(Grid)`
    padding-right: 4rem;
    padding-left: 4rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

export const StyledTitle = styled(Typography)`
    padding-right: 1rem;
`
