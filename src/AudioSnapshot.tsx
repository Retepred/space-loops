import React from 'react'
import { StyledImageListItem } from './styles'
import { ImageListItem, Typography } from '@mui/material'
import { Image } from './types'

interface AudioSnapshotProps {
    item: Image
    handleImageClick: (data: Image) => void
}

export const AudioSnapshot = (props: AudioSnapshotProps) => {
    const { item, handleImageClick } = props
    const microphoneLink =
        'https://static.vecteezy.com/system/resources/previews/004/438/318/original/sound-recorder-glyph-icon-professional-music-microphone-musical-record-equipment-portable-audio-mic-wireless-recording-device-silhouette-symbol-negative-space-isolated-illustration-vector.jpg'
    return (
        <StyledImageListItem
            key={item.href}
            onClick={() => handleImageClick(item)}
        >
            <ImageListItem>
                <img
                    src={microphoneLink}
                    srcSet={microphoneLink}
                    alt={microphoneLink}
                    loading="lazy"
                />
                <Typography>{item.data[0].title}</Typography>
            </ImageListItem>
        </StyledImageListItem>
    )
}
