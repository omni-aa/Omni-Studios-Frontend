import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {SanityImageType} from "@/Interfaces/Sanity/sanity-image-interface.ts";
export const client = createClient({
    apiVersion:'2023-05-03',
    dataset:'production',
    projectId:'q1nusvj5',
    useCdn:false,
})

const builder = imageUrlBuilder(client)


export function urlFor(source: never){
    return builder.image(source)
}
export function urlForImage(source: SanityImageType){
    return builder.image(source)
}