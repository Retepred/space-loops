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
} from '@mui/material'
import axios from 'axios'
import { NasaImageData } from './types'
import { GeneratedIdentifierFlags } from 'typescript'

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

export const App = () => {
    const [data, setData] = useState<NasaImageData>()
    const [searchText, setSearchText] = useState('apollo%2011')
    const [images, setImages] = useState(false)
    const [audio, setAudio] = useState(false)
    const [video, setVideo] = useState(false)
    const getInitialData = () => {
        axios
            .get(
                `https://images-api.nasa.gov/search?&media_type=image&q=${searchText}`
            )
            .then((response) => {
                setData(response.data)
            })
    }
    return (
        <div className="App">
            <StyledContainer container justifyContent="center" spacing={1}>
                <Grid xs={3}>
                    <Typography align="center" variant="h3">
                        Space Loops
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="What do you want to look for?"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1}>
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
                        checked={images}
                        control={<Radio />}
                        label="images"
                        onClick={(e) => setImages(!images)}
                    />
                    <FormControlLabel
                        checked={audio}
                        control={<Radio />}
                        label="audio"
                        onClick={(e) => setAudio(!audio)}
                    />
                    <FormControlLabel
                        checked={video}
                        onClick={(e) => setVideo(!video)}
                        control={<Radio />}
                        label="video"
                    />
                </Grid>
            </StyledContainer>
            <Grid container alignContent="center" justifyContent="center">
                {data && (
                    <ImageList variant="quilted" cols={4} gap={5}>
                        {data.collection.items.map((item) => {
                            const data = item.links[0]
                            return (
                                <StyledImageListItem key={data.href}>
                                    <img
                                        src={`${data.href}`}
                                        srcSet={`${data.href}`}
                                        alt={data.href}
                                        loading="lazy"
                                    />
                                </StyledImageListItem>
                            )
                        })}
                    </ImageList>
                )}
            </Grid>
        </div>
    )
}
