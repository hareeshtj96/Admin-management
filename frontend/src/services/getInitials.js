export const getInitials = (name) => {
    if (!name) return 'A';
    const nameParts = name.split(" ");

    // if full name, take first part
    if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    // if it is a one word name
    return name[0].toUpperCase();
};

export const getNameFromEmail = (email) => {
    if (!email) return '';

    const namePart = email.split('@')[0];
    const formattedName = namePart.replace(/\./g, ' ');

    // Capitalize the first letter of each word
    return formattedName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const getIntialsFromEmail = (email) => {
    const name = getNameFromEmail(email);
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();

};