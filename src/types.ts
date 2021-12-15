export interface ImageData {
    center?: string
    date_created: string
    description: string
    keyworks: string[]
    media_type: string
    nasa_id: string
    title: string
}
export interface Image {
    data: ImageData[]
    href: string
    links: { href: string; rel: any; render: any }[]
}

export interface NasaImageData {
    collection: {
        href: string
        items: Image[]
        metadata: any
        version: string
    }
}
