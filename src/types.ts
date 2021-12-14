export interface Image {
    data: any
    href: string
    links: any[]
}

export interface NasaImageData {
    collection: {
        href: string
        items: Image[]
        metadata: any
        version: string
    }
}
