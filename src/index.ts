/**
 * Throws an error when called
 * @param error either error object or a string
 */
export const Throw = (error: string | Error): never => {
    if (typeof error === 'string') {
        throw new Error(error);
    }
    throw error;
};

/**
 * Throw exception if value is null
 * @param value value to be checked for null
 * @param error either error object or a string
 */
export const throwIfNull = <T>(value: T | null, error: string | Error = 'value is null'): T => value === null ? Throw(error) : value;

/**
 * Throw exception if value is undefined
 * @param value value to be checked for undefined
 * @param error either error object or a string
 */
export const throwIfUndefined = <T>(value: T | undefined, error: string | Error = 'value is undefined'): T => value === undefined ? Throw(error) : value;

/**
 * Throw exception if value is falsy: empty string, zero, false, NaN, undefined or null
 * @param value value to be checked for falsy: empty string, zero, false, NaN, undefined or null
 * @param error either error object or a string
 */
export const throwIfFalsy = <T>(value: T | "" | 0 | false, error: string | Error = 'value is falsy'): NonNullable<T> => !value ? Throw(error) : value!;

/**
 * Throw exception if value is NaN, or not a number at all
 * @param value value to be checked for NaN or not a number at all
 * @param error either error object or a string
 */
export const throwIfNotANumber = <T>(value: T, error: string | Error = 'value is not a number'): number => typeof value !== "number" || isNaN(value) ? Throw(error) : value!;

/**
 * Throw expression if value is null or undefined
 * @param value to be checked for null or undefined
 * @param error either error object or a string
 */
export const throwIfNullish = <T>(value: T, error: string | Error = 'value is nullish'): NonNullable<T> => (value === undefined || value === null) ? Throw(error) : value!;
