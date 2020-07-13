
/**
@description Formats a given number with dots after every three digits
**/
export const formatWithDots = (value) => {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};