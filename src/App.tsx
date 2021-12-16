import React, { useState } from 'react'
import {
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
import { StyledContainer, StyledTitle } from './styles'
import { ImageSnapshot } from './ImageSnapshot'
import { AudioSnapshot } from './AudioSnapshot'
import { ImageDetailDialog } from './ImageDetailDialog'
import { AudioDetailDialog } from './AudioDetailDialog'

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
                console.log(error)
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
                    <img
                        src={'orbit.png'}
                        alt="icon of an orbit"
                        width="60px"
                    />
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
                        onChange={() => handleSearchSwitch()}
                    />
                    <FormControlLabel
                        checked={!searchSwitch}
                        control={<Radio />}
                        label="audio"
                        onChange={() => handleSearchSwitch()}
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
                                        key={item.href}
                                        item={item}
                                        handleImageClick={handleImageClick}
                                    />
                                ) : (
                                    <AudioSnapshot
                                        key={item.href}
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
                {imageDetail && searchSwitch && (
                    <ImageDetailDialog imageDetail={imageDetail} />
                )}
                {imageDetail && !searchSwitch && (
                    <AudioDetailDialog audioDetail={imageDetail} />
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
