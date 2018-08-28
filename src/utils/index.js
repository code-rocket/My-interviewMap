/**
 * create link
 * @param path
 * @param rel
 * @param type
 */
export const createLink = (path, rel, type) => {
    if (!path || path.length === 0) {
        throw new Error('argument "path" is required !');
    }
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.href = path;
    link.rel = rel;
    link.type = type;
    head.appendChild(link);
};
