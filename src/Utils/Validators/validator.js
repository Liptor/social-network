export const requiredFiled = value => {
    if (value) return undefined;
    return 'Filed is required'

}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
