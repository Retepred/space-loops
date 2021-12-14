import React, { useState } from 'react'
import { Typography, Grid, Button } from '@mui/material'
import { getAll } from './utils/nasaHelpers'
import axios from 'axios'
import { NasaImageData } from './types'

export const App = () => {
    const [data, setData] = useState<NasaImageData>()
    const getInitialData = () => {
        axios
            .get(
                'https://images-api.nasa.gov/search?&media_type=image&q=apollo%2011'
            )
            .then((response) => {
                setData(response.data)
            })
    }
    return (
        <div className="App">
            <Typography>space loops</Typography>
            <Grid>
                <Button onClick={() => getInitialData()}>Search!</Button>
            </Grid>
            <Grid container>
                {data &&
                    data.collection.items.map((image) => {
                        return (
                            <Grid item>
                                <Typography>{image.href}</Typography>
                            </Grid>
                        )
                    })}
            </Grid>
        </div>
    )
}
