# throw-expression

This package emulates proposed functionality with inline throwable expression.

## Before:

```typescript

const length = (value: string) => {
    if (value === undefined || value === null) {
        throw new Error('falsy value entered!');
    }
    return value.length;
}

```

## After:

```typescript

const length = (value: string) => throwIfFalsy(value, 'falsy value entered!').length; // will not throw on empty string, zero etc.

// Or:

const length = (value: string) => (value || Throw('falsy value entered!')).length; // will throw on any falsy value

```

The function is named 'Throw' to avoid javascript keyword. Along with this function, several other simple utility functions are exported.
Typing on these utilities should help you avoid most of the nonsensical TS messages about nullable properties.

## Examples from unit tests

```typescript

describe("Can use throwable expressions to throw when necessary", () => {
    test("Can simply throw", () => {
        expect(() => Throw('Write your exception message here')).toThrow('Write your exception message here');
        expect(() => Throw(Error('Write your exception message here'))).toThrow('Write your exception message here');        
    });
    test("Can throw conditionally", () => {
        let value: string | null = null;
        expect(() => value || Throw('is null')).toThrow('is null');
        value = 'anything else';
        expect(value || Throw('is null')).toBe('anything else');
    });
    test("Can check for null with throwable", () => {
        expect(() => throwIfNull(null, 'is null')).toThrow('is null');
        expect(throwIfNull(undefined, 'is null')).toBe(undefined);
        expect(throwIfNull(false, 'is null')).toBe(false);
    });
    test("Can check for undefined with throwable", () => {
        expect(throwIfUndefined(null, 'is undefined')).toBe(null);
        expect(() => throwIfUndefined(undefined, 'is undefined')).toThrow('is undefined');
        expect(throwIfUndefined(false, 'is undefined')).toBe(false);
    });
    test("Can check for falsy with throwable", () => {
        expect(() => throwIfFalsy(null, 'is falsy')).toThrow('is falsy');
        expect(() => throwIfFalsy(undefined, 'is falsy')).toThrow('is falsy');
        expect(throwIfFalsy("", 'is falsy')).toBe("");
        expect(throwIfFalsy(false, 'is falsy')).toBe(false); // in this case, 'Falsy' is a shorthand for null/undefined, not values like 0 or false
    });
    test("Can be used in an expression with string/null type", () => {
        let value: string | null = null;
        expect(() => throwIfNull(value, 'is null').length).toThrow('is null');
        value = 'any';
        expect(throwIfNull(value, 'is null').length).toBe(3);
    });
    test("Can be used in an expression with string/undefined/null type", () => {
        let value: string | null | undefined = null;
        expect(() => throwIfFalsy(value, 'is falsy').length).toThrow('is falsy');
        value = 'any';
        expect(throwIfFalsy(value, 'is falsy').length).toBe(3);
    });
});

```

## Footer

If you encounter any bugs, or have ideas for improvement, do not hesitate to add a task or a pull request.
