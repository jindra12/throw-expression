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
 * Throw exception if value is null or undefined
 * @param value value to be checked for null or undefined
 * @param error either error object or a string
 */
export const throwIfFalsy = <T>(value: T, error: string | Error = 'value is undefined'): NonNullable<T> => (value === undefined || value === null) ? Throw(error) : value!;
