export type TypeCompareAnalysis = 'string' | 'number' | 'Date';

export type DefinedCompare<T> = ((a: T, b: T) => number) | ((a: T) => number);

export interface Tree<T> {
    parent: Tree<T> | null;
    item: T;
    children: Array<Tree<T>>;
}

declare global {
    interface Array<T> {
        heap: (compare?: DefinedCompare<T>) => Heap<T>;
    }
}



/**
 * Promisified version of heap
 */
export interface PromiseHeap<T> {
    /**
     * Original sync heap
     */
    heap: Heap<T>;

    /**
     * Remove top element (min)
     */
    pop: () => Promise<T | null>;

    /**
     * Does this heap equal another?
     */
    equals: (heap: PromiseHeap<T>) => Promise<boolean>;

    /**
     * Find out minimum value in heap
     */
    min: () => T | null;

    /**
     * Returns sorted array of elements. Will empty out the heap
     */
    sort: () => Promise<T[]>;

    /**
     * Delete an element, min or max from heap
     */
    delete: (item: T | ((compare: T) => boolean)) => Promise<T | null>;

    /**
     * Search through the heap for an element
     */
    search: (seek: T | ((compare: T) => boolean)) => Promise<T | null>;

    /**
     * Set up custom comparator function
     */
    compare: (comparison: DefinedCompare<T>) => Promise<PromiseHeap<T>>;

    /**
     * Merge two heaps together
     */
    merge: <E>(
        heap: PromiseHeap<E>,
        compare?: DefinedCompare<T | E>,
        disableSanityCheck?: boolean,
    ) => Promise<PromiseHeap<T | E>>;

    /**
     * Add another element
     */
    push: <E>(
        item: E,
        compare?: DefinedCompare<T | E>,
        disableSanityCheck?: boolean,
    ) => Promise<PromiseHeap<T | E>>;

    /**
     * Turn heap back to sync
     */
    sync: () => Heap<T>;
}

export interface Heap<T> {

    /**
     * Index of min location
     */
    minimum: number;

    /**
     * Items in queue
     */
    items: Array<Tree<T>>;

    /**
     * Remove top element (min)
     */
    pop: () => T | null;

    /**
     * Does this heap equal another?
     */
    equals: (heap: Heap<T>) => boolean;

    /**
     * Find out minimum value in heap
     */
    min: () => T | null;

    /**
     * Returns sorted array of elements. Will empty out the heap
     */
    sort: () => T[];

    /**
     * Delete an element, min or max from heap
     */
    delete: (item: T | ((compare: T) => boolean)) => T | null;

    /**
     * Search through the heap for an element
     */
    search: (seek: T | ((compare: T) => boolean)) => T | null;

    /**
     * Function which is currently used for comparison
     */
    compareFunction: (a: T, b: T) => number;

    /**
     * What kind of default comparison function will be used
     */
    kindOfCompare: TypeCompareAnalysis;

    /**
     * Set up custom comparator function
     */
    compare: (comparison: DefinedCompare<T>) => Heap<T>;

    /**
     * Merge two heaps together
     */
    merge: <E>(
        heap: Heap<E>,
        compare?: DefinedCompare<T | E>,
        disableSanityCheck?: boolean,
    ) => Heap<T | E>;

    /**
     * Add another element
     */
    push: <E>(
        item: E,
        compare?: DefinedCompare<T | E>,
        disableSanityCheck?: boolean,
    ) => Heap<T | E>;

    /**
     * Converts heap to asynchronous
     */
    promisify: () => PromiseHeap<T>;
}