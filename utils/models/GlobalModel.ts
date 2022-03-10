export const slugify = (text:string) => {
return text.split(' ').join('-').toLowerCase();
};