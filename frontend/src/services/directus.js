import {
    Directus
} from '@directus/sdk';

const directus = new Directus('https://workable-admittedly-stallion.ngrok-free.app');

const bloggers = directus.items('blogger')

const posts = directus.items('post')

export {
    directus,
    bloggers,
    posts
}