import { parking } from '../client/js/parking_list';

describe("Testing the form parking list function", () => {
    test("parking be a function", () => {
        expect(typeof parking).toBe("function");
    })
});