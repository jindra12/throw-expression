export const Throw = (error: string | Error): never => {
    if (typeof error === 'string') {
        throw new Error(error);
    }
    throw error;
};

export const throwIfNull = <T>(value: T | null, error: string | Error = 'value is null'): T => value === null ? Throw(error) : value;
export const throwIfUndefined = <T>(value: T | undefined, error: string | Error = 'value is undefined'): T => value === undefined ? Throw(error) : value;
export const throwIfFalsy = <T>(value: T, error: string | Error = 'value is undefined'): NonNullable<T> => (value === undefined || value === null) ? Throw(error) : value!;
