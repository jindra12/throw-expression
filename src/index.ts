type Fn<T1, T2> = (arg: T1) => T2;

type InferProm<T> = T extends Promise<infer P> ? P : T;
type CheckIfPromise<T> = T extends Promise<any> ? true : false;
type CoalProm<T, TPromise extends boolean> = TPromise extends true
    ? true
    : CheckIfPromise<T>;
type MaybeReturnType<T, TParams> = TParams extends [] ? T extends (...args: TParams) => infer R ? R : T : T extends (...args: any[]) => infer R ? R : T;
type MaybeParameters<T> = T extends (...args: any[]) => any ? Parameters<T> : never[];

export interface PipelineCreator {
    <T, T1>(value: T, fn: Fn<InferProm<T>, T1>): Pipeline<InferProm<T1>, CoalProm<T1, CheckIfPromise<T>>>;
    <T, T1, T2>(value: T, fn: Fn<InferProm<T>, T1>, fn1: Fn<InferProm<T1>, T2>): Pipeline<
        InferProm<T2>,
        CoalProm<T2, CoalProm<T1, CheckIfPromise<T>>>
    >;
    <T, T1, T2, T3>(
        value: T,
        fn: Fn<InferProm<T>, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>
    ): Pipeline<
        InferProm<T3>,
        CoalProm<T3, CoalProm<T3, CoalProm<T1, CheckIfPromise<T>>>>
    >;
    <T, T1, T2, T3, T4>(
        value: T,
        fn: Fn<InferProm<T>, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>
    ): Pipeline<
        InferProm<T4>,
        CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, CheckIfPromise<T>>>>>
    >;
    <T, T1, T2, T3, T4, T5>(
        value: T,
        fn: Fn<InferProm<T>, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>
    ): Pipeline<
        InferProm<T5>,
        CoalProm<
            T5,
            CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, CheckIfPromise<T>>>>>
        >
    >;
    <T, T1, T2, T3, T4, T5, T6>(
        value: T,
        fn: Fn<InferProm<T>, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>
    ): Pipeline<
        InferProm<T6>,
        CoalProm<
            T6,
            CoalProm<
                T5,
                CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, CheckIfPromise<T>>>>>
            >
        >
    >;
    <T, T1, T2, T3, T4, T5, T6, T7>(
        value: T,
        fn: Fn<InferProm<T>, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>,
        fn6: Fn<InferProm<T6>, T7>
    ): Pipeline<
        InferProm<T7>,
        CoalProm<
            T7,
            CoalProm<
                T6,
                CoalProm<
                    T5,
                    CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, CheckIfPromise<T>>>>>
                >
            >
        >
    >;
    <T, T1, T2, T3, T4, T5, T6, T7, T8>(
        value: T,
        fn: Fn<InferProm<T>, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>,
        fn6: Fn<InferProm<T6>, T7>,
        fn7: Fn<InferProm<T7>, T8>
    ): Pipeline<
        InferProm<T8>,
        CoalProm<
            T8,
            CoalProm<
                T7,
                CoalProm<
                    T6,
                    CoalProm<
                        T5,
                        CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, CheckIfPromise<T>>>>>
                    >
                >
            >
        >
    >;
    <T, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        value: T,
        fn: Fn<InferProm<T>, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>,
        fn6: Fn<InferProm<T6>, T7>,
        fn7: Fn<InferProm<T7>, T8>,
        fn8: Fn<InferProm<T8>, T9>
    ): Pipeline<
        InferProm<T9>,
        CoalProm<
            T9,
            CoalProm<
                T8,
                CoalProm<
                    T7,
                    CoalProm<
                        T6,
                        CoalProm<
                            T5,
                            CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, CheckIfPromise<T>>>>>
                        >
                    >
                >
            >
        >
    >;
}

export interface Pipeline<T, TPromise extends boolean> {
    (): TPromise extends true ? Promise<T> : T;
    <T1>(fn: Fn<T, T1>): Pipeline<InferProm<T1>, CoalProm<T1, TPromise>>;
    <T1, T2>(fn: Fn<T, T1>, fn1: Fn<InferProm<T1>, T2>): Pipeline<
        InferProm<T2>,
        CoalProm<T2, CoalProm<T1, TPromise>>
    >;
    <T1, T2, T3>(
        fn: Fn<T, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>
    ): Pipeline<
        InferProm<T3>,
        CoalProm<T3, CoalProm<T3, CoalProm<T1, TPromise>>>
    >;
    <T1, T2, T3, T4>(
        fn: Fn<T, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>
    ): Pipeline<
        InferProm<T4>,
        CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, TPromise>>>>
    >;
    <T1, T2, T3, T4, T5>(
        fn: Fn<T, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>
    ): Pipeline<
        InferProm<T5>,
        CoalProm<
            T5,
            CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, TPromise>>>>
        >
    >;
    <T1, T2, T3, T4, T5, T6>(
        fn: Fn<T, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>
    ): Pipeline<
        InferProm<T6>,
        CoalProm<
            T6,
            CoalProm<
                T5,
                CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, TPromise>>>>
            >
        >
    >;
    <T1, T2, T3, T4, T5, T6, T7>(
        fn: Fn<T, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>,
        fn6: Fn<InferProm<T6>, T7>
    ): Pipeline<
        InferProm<T7>,
        CoalProm<
            T7,
            CoalProm<
                T6,
                CoalProm<
                    T5,
                    CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, TPromise>>>>
                >
            >
        >
    >;
    <T1, T2, T3, T4, T5, T6, T7, T8>(
        fn: Fn<T, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>,
        fn6: Fn<InferProm<T6>, T7>,
        fn7: Fn<InferProm<T7>, T8>
    ): Pipeline<
        InferProm<T8>,
        CoalProm<
            T8,
            CoalProm<
                T7,
                CoalProm<
                    T6,
                    CoalProm<
                        T5,
                        CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, TPromise>>>>
                    >
                >
            >
        >
    >;
    <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        fn: Fn<T, T1>,
        fn1: Fn<InferProm<T1>, T2>,
        fn2: Fn<InferProm<T2>, T3>,
        fn3: Fn<InferProm<T3>, T4>,
        fn4: Fn<InferProm<T4>, T5>,
        fn5: Fn<InferProm<T5>, T6>,
        fn6: Fn<InferProm<T6>, T7>,
        fn7: Fn<InferProm<T7>, T8>,
        fn8: Fn<InferProm<T8>, T9>
    ): Pipeline<
        InferProm<T9>,
        CoalProm<
            T9,
            CoalProm<
                T8,
                CoalProm<
                    T7,
                    CoalProm<
                        T6,
                        CoalProm<
                            T5,
                            CoalProm<T4, CoalProm<T3, CoalProm<T2, CoalProm<T1, TPromise>>>>
                        >
                    >
                >
            >
        >
    >;
    <T, TKey extends keyof T = keyof T, TParameters extends MaybeParameters<T[TKey]> = MaybeParameters<T[TKey]>>(
        key: TKey,
        ...args: TParameters
    ): Pipeline<MaybeReturnType<T[TKey], TParameters>, CheckIfPromise<MaybeReturnType<T[TKey], TParameters>>>;
}

const resolver = (currentValue: any, queue: any[]): any => {
    if (queue.length === 0) {
        return currentValue;
    }
    if (config.checkIfPromise(currentValue)) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const realValue = await currentValue;
                resolve(resolver(realValue, queue));
            } catch(e) {
                reject(e);
            }
        });
    }
    const evaluated = queue[0](currentValue);
    if (config.checkIfPromise(evaluated)) {
        return new Promise<any>(async (resolve, reject) => {
            const awaited = await evaluated;
            try {
                resolve(resolver(awaited, queue.slice(1)));
            } catch (e) {
                reject(e);
            }
        });
    } else {
        return resolver(evaluated, queue.slice(1));
    }
};

const pipelineCreator = (value: any, ...args: any[]): any => {
    const nextCallFactory: any = (value: any, ...args: any[]) => {
        const queue = args;

        return (...args: any[]): any => {
            if (args.length === 0) {
                return resolver(value, queue);
            } else {
                return nextCallFactory(value, ...queue, ...args);
            }
        }
    };

    return nextCallFactory(value, ...args);
};

const typedPipeline: PipelineCreator = pipelineCreator;

export default typedPipeline;

let config = {
    checkIfPromise: (value: any): value is Promise<any> => value instanceof Promise,
};

export const setConfig = (configuration: typeof config) => {
    config = configuration;
};