import { print } from '../client/js/print';

describe("Testing the form print function", () => {
    test("Print must be a function", () => {
        expect(typeof print).toBe("function");
    })
});