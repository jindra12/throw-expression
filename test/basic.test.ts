import pipe from "../src";

describe("Test if pipeline has correct typing and implementation", () => {
    it("Basic single parameter tests", async () => {
        expect(pipe(5, (value) => value + 3)()).toBe(8);
        expect(await pipe(5, async (value) => value + 5)()).toBe(10);
    });
    it("Can determine the type/result of a pipe up to 9 params", async () => {
        expect(pipe(5, (x) => x > 2)()).toBe(true);
        expect(
            pipe(
                5,
                (x) => x > 2,
                (x) => (x ? "yes" : "no")
            )()
        ).toBe("yes");
        expect(
            pipe(
                5,
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length
            )()
        ).toBe(3);
        expect(
            pipe(
                5,
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2
            )()
        ).toBe(1);
        expect(
            pipe(
                5,
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n]
            )()
        ).toEqual([1]);
        expect(
            pipe(
                5,
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n],
                (n) => n.map((x) => x + 2)
            )()
        ).toEqual([3]);
        expect(
            await pipe(
                5,
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n],
                (n) => n.map((x) => x + 2),
                async (n) => n.filter((x) => x > 2),
                (n) => n.concat([2])
            )()
        ).toEqual([3, 2]);
        expect(
            await pipe(
                5,
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n],
                (n) => n.map((x) => x + 2),
                async (n) => n.filter((x) => x > 2),
                (n) => n.concat([2]),
                async (n) => n.concat([4])
            )()
        ).toEqual([3, 2, 4]);
    });
    it("Can determine the result of a chained pipe up to 9 params", async () => {
        const basicPipe = pipe(4, (x) => x + 1);
        expect(basicPipe((x) => x > 2)()).toBe(true);
        expect(
            basicPipe(
                (x) => x > 2,
                (x) => (x ? "yes" : "no")
            )()
        ).toBe("yes");
        expect(
            basicPipe(
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length
            )()
        ).toBe(3);
        expect(
            basicPipe(
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2
            )()
        ).toBe(1);
        expect(
            basicPipe(
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n]
            )()
        ).toEqual([1]);
        expect(
            basicPipe(
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n],
                (n) => n.map((x) => x + 2)
            )()
        ).toEqual([3]);
        expect(
            await basicPipe(
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n],
                (n) => n.map((x) => x + 2),
                async (n) => n.filter((x) => x > 2),
                (n) => n.concat([2])
            )()
        ).toEqual([3, 2]);
        expect(
            await basicPipe(
                (x) => x > 2,
                (x) => (x ? "yes" : "no"),
                (x) => x.length,
                (n) => n % 2,
                (n) => [n],
                (n) => n.map((x) => x + 2),
                async (n) => n.filter((x) => x > 2),
                (n) => n.concat([2]),
                async (n) => n.concat([4])
            )()
        ).toEqual([3, 2, 4]);
    });
    it("Can fully work with promises", async () => {
        const basePromise = new Promise<number>((resolve) => resolve(5));
        expect(await pipe(basePromise, (x) => x + 2)()).toBe(7);
    });
    it("Will not evaluate until called", () => {
        let called = false;
        let calledFromChain = false;
        const basePipe = pipe([1, 2, 3], array => array.map((x) => {
            called = true;
            return x + 1;
        }));
        const advancedPipe = basePipe(array => array.filter((x) => {
            calledFromChain = true;
            return x > 2;
        }));
        expect(called).toBe(false);
        expect(calledFromChain).toBe(false);
        basePipe();
        expect(called).toBe(true);
        expect(calledFromChain).toBe(false);
        advancedPipe();
        expect(calledFromChain).toBe(true);
    });
});
