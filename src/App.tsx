import React, { useState } from 'react'
import {
    Typography,
    Grid,
    Button,
    ImageList,
    TextField,
    Radio,
    FormControlLabel,
    Dialog,
    Alert,
} from '@mui/material'
import axios from 'axios'
import { Image, NasaImageData } from './types'
import { StyledContainer, StyledTitle, StyledDialogGrid } from './styles'
import { ImageSnapshot } from './ImageSnapshot'
import { AudioSnapshot } from './AudioSnapshot'

export const App = () => {
    const [data, setData] = useState<NasaImageData>()
    const [searchText, setSearchText] = useState('apollo%2011')
    const [searchSwitch, setSearchSwitch] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [imageDetail, setImageDetail] = useState<Image>()
    const [errorPresent, setErrorPresent] = useState(false)

    const getData = () => {
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
            .catch((error) => {
                setErrorPresent(true)
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
    const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.key === 'Enter' && getData()
    }

    return (
        <div className="App">
            <StyledContainer container justifyContent="center" spacing={1}>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    xs={12}
                >
                    <StyledTitle align="center" variant="h3">
                        Space Loops
                    </StyledTitle>
                    <img src={'orbit.png'} width="60px" />
                </Grid>

                <Grid item>
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="What do you want to see?"
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                </Grid>
                <Grid item>
                    <Button fullWidth variant="text" onClick={() => getData()}>
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
                                return searchSwitch ? (
                                    <ImageSnapshot
                                        item={item}
                                        handleImageClick={handleImageClick}
                                    />
                                ) : (
                                    <AudioSnapshot
                                        item={item}
                                        handleImageClick={handleImageClick}
                                    />
                                )
                            })}
                    </ImageList>
                )}
            </Grid>
            <Dialog
                maxWidth="lg"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                {imageDetail && (
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
                )}
            </Dialog>
            <Dialog open={errorPresent} onClose={() => setErrorPresent(false)}>
                <Alert severity="error">
                    An error has ocurred, please try again.
                </Alert>
            </Dialog>
        </div>
    )
}
