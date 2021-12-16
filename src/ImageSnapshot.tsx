import React from 'react'
import { StyledImageListItem } from './styles'
import { Image } from './types'

interface ImageSnapshotProps {
    item: Image
    handleImageClick: (data: Image) => void
}

export const ImageSnapshot = (props: ImageSnapshotProps) => {
    const { item, handleImageClick } = props
    return (
        <StyledImageListItem
            key={item.href}
            onClick={() => handleImageClick(item)}
        >
            <img
                src={item.links[0].href}
                srcSet={item.links[0].href}
                alt={item.links[0].href}
                loading="lazy"
            />
        </StyledImageListItem>
    )
}
