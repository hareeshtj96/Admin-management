export const getInitials = (name) => {
    if (!name) return 'A';
    const nameParts = name.split(" ");

    // if full name, take first part
    if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    // if it is a one word name
    return name[0].toUpperCase();
}