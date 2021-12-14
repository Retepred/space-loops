export interface Image {
    data: any
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
