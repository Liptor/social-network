export type FieldValidatorType = (value: string) => string | undefined

export const requiredFiled: FieldValidatorType = (value) => {
    if (value) return undefined;
    return 'Filed is required'

}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
