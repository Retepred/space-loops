import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { StyledDialogGrid } from './styles'
import { Image } from './types'
import axios from 'axios'

export interface AudioDetailDialogProps {
    audioDetail: Image
}

// http://images-assets.nasa.gov/audio/Apollo11Highlights/Apollo11Highlights~orig.wav
// https://images-assets.nasa.gov/audio/Apollo201120Highlights/Apollo201120Highlights~orig.wav

export const AudioDetailDialog = (props: AudioDetailDialogProps) => {
    const [link, setLink] = useState('')
    const microphoneLink =
        'https://static.vecteezy.com/system/resources/previews/004/438/318/original/sound-recorder-glyph-icon-professional-music-microphone-musical-record-equipment-portable-audio-mic-wireless-recording-device-silhouette-symbol-negative-space-isolated-illustration-vector.jpg'
    const { audioDetail } = props

    axios.get(audioDetail.href).then((response) => {
        setLink(response.data[0])
    })

    const handleClick = () => {
        window.open(link, '_blank')
    }
    return (
        <StyledDialogGrid
            container
            alignContent="center"
            justifyContent="center"
            direction="column"
            spacing={3}
            onClick={() => handleClick()}
        >
            <Grid item container justifyContent="center">
                <img
                    height={50}
                    src={microphoneLink}
                    srcSet={microphoneLink}
                    alt={microphoneLink}
                    loading="lazy"
                />
            </Grid>
            <Grid item>
                <Typography align="center" variant="h5">
                    {audioDetail.data[0].title}
                </Typography>
            </Grid>
            <Grid item>
                <Typography align="center" variant="h6">
                    Click anywhere to listen to this podcast or read the
                    transcript below
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body2">
                    {audioDetail.data[0].description}
                </Typography>
            </Grid>
        </StyledDialogGrid>
    )
}
