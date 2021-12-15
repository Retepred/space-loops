import React, { useState } from 'react'
import {
    Typography,
    Grid,
    Button,
    ImageList,
    ImageListItem,
    TextField,
    styled,
    Radio,
    FormControlLabel,
    Dialog,
} from '@mui/material'
import axios from 'axios'
import { Image, NasaImageData } from './types'

const StyledImageListItem = styled(ImageListItem)`
    border: 1px solid black;
    width: 200px;
    :hover {
        box-shadow: 0 0 2px #1976d2;
        border: 1px solid #1976d2;
    }
`

const StyledContainer = styled(Grid)`
    padding-top: 5rem;
    padding-left: 10rem;
    padding-right: 10rem;
`

const StyledDialog = styled(Dialog)`
    padding-right: 4rem;
    padding-left: 4rem;
    width: 60rem;
`

const StyledDialogGrid = styled(Grid)`
    padding-top: 1rem;
    padding-bottom: 1rem;
`

export const App = () => {
    const [data, setData] = useState<NasaImageData>()
    const [searchText, setSearchText] = useState('apollo%2011')
    const [searchSwitch, setSearchSwitch] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [imageDetail, setImageDetail] = useState<Image>()
    const getInitialData = () => {
        const searchString = searchSwitch
            ? '&media_type=image'
            : '&media_type=audio'
        axios
            .get(
                `https://images-api.nasa.gov/search?${searchString}&q=${searchText}`
            )
            .then((response) => {
                setData(response.data)
                console.log(response.data)
            })
    }
    const handleSearchSwitch = () => {
        setData(undefined)
        setSearchSwitch(!searchSwitch)
    }
    const handleImageClick = (data: Image) => {
        console.log(data)
        setImageDetail(data)
        setIsOpen(true)
    }
    return (
        <div className="App">
            <StyledContainer container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h3">
                        Space Loops
                    </Typography>
                </Grid>

                <Grid item>
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="What do you want to see?"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => getInitialData()}
                    >
                        Search!
                    </Button>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    alignContent="center"
                    justifyContent="center"
                >
                    <FormControlLabel
                        checked={searchSwitch}
                        control={<Radio />}
                        label="images"
                        onClick={() => handleSearchSwitch()}
                    />
                    <FormControlLabel
                        checked={!searchSwitch}
                        control={<Radio />}
                        label="audio"
                        onClick={() => handleSearchSwitch()}
                    />
                </Grid>
            </StyledContainer>
            <Grid container alignContent="center" justifyContent="center">
                {data && (
                    <ImageList variant="quilted" cols={4} gap={5}>
                        {data.collection.items.length > 0 &&
                            data.collection.items.map((item) => {
                                const showData = !searchSwitch
                                    ? {
                                          href: 'https://static.vecteezy.com/system/resources/previews/004/438/318/original/sound-recorder-glyph-icon-professional-music-microphone-musical-record-equipment-portable-audio-mic-wireless-recording-device-silhouette-symbol-negative-space-isolated-illustration-vector.jpg',
                                      }
                                    : item.links[0]
                                return (
                                    <StyledImageListItem
                                        key={showData.href}
                                        onClick={() => handleImageClick(item)}
                                    >
                                        <img
                                            src={`${showData.href}`}
                                            srcSet={`${showData.href}`}
                                            alt={showData.href}
                                            loading="lazy"
                                        />
                                    </StyledImageListItem>
                                )
                            })}
                    </ImageList>
                )}
            </Grid>
            <StyledDialog open={isOpen}>
                {imageDetail && (
                    <StyledDialogGrid
                        container
                        alignContent="center"
                        justifyContent="center"
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
                        <Grid item>
                            <img
                                src={`${imageDetail.links[0].href}`}
                                srcSet={`${imageDetail.links[0].href}`}
                                alt={imageDetail.links[0].href}
                                loading="lazy"
                            />
                        </Grid>
                    </StyledDialogGrid>
                )}
                <Button onClick={() => setIsOpen(false)}>Close</Button>
            </StyledDialog>
        </div>
    )
}
