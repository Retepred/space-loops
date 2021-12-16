import React from 'react'
import { Grid, Typography } from '@mui/material'
import { StyledDialogGrid } from './styles'
import { Image } from './types'

export interface ImageDetailDialogProps {
    imageDetail: Image
}

export const ImageDetailDialog = (props: ImageDetailDialogProps) => {
    const { imageDetail } = props
    return (
        <StyledDialogGrid
            container
            alignContent="center"
            justifyContent="center"
            direction="column"
            spacing={3}
        >
            <Grid item>
                <Typography align="center" variant="h5">
                    {imageDetail.data[0].title}
                </Typography>
            </Grid>
            <Grid item>
                <Typography align="center">
                    {imageDetail.data[0].description}
                </Typography>
            </Grid>
            <Grid item container justifyContent="center">
                <img
                    src={`${imageDetail.links[0].href}`}
                    srcSet={`${imageDetail.links[0].href}`}
                    alt={imageDetail.links[0].href}
                    loading="lazy"
                />
            </Grid>
        </StyledDialogGrid>
    )
}
