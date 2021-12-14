import React, { useState } from 'react'
import {
    Typography,
    Grid,
    Button,
    ImageList,
    ImageListItem,
    TextField,
} from '@mui/material'
import { getAll } from './utils/nasaHelpers'
import axios from 'axios'
import { NasaImageData } from './types'

export const App = (props: any) => {
    const [data, setData] = useState<NasaImageData>()
    const [searchText, setSearchText] = useState('apollo%2011')
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
            <Grid
                container
                direction="column"
                alignContent="center"
                spacing={1}
            >
                <Grid item>
                    <Typography variant="h2">Space Loops</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => getInitialData()}
                    >
                        Search!
                    </Button>
                </Grid>
            </Grid>
            <Grid container alignContent="center" justifyContent="center">
                {data && (
                    <ImageList cols={4} gap={10} rowHeight={164}>
                        {data.collection.items.map((item) => {
                            const data = item.links[0]
                            return (
                                <ImageListItem key={data.href}>
                                    <img
                                        height="164"
                                        width="164"
                                        src={`${data.href}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${data.href}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={data.href}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            )
                        })}
                    </ImageList>
                )}
            </Grid>
        </div>
    )
}
