import axios from 'axios'
import { NasaImageData } from '../types'

export const getAll = () => {
    const data = axios
        .get('https://images-api.nasa.gov/search?q=apollo%2011')
        .then<NasaImageData>((response) => {
            return response.data
        })
    return data
}
