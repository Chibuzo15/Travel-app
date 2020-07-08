import { geonames_ } from './_MockAPI_';

describe("Test geonames_ API", () => {
    test("geonames_ should be a function", () => {
        expect(typeof geonames_).toBe("function");
    });

    test("geonames function should have a response", () => {
        geonames_("Capetown")
            .then((res) => res.json())
            .then((res) => {
                expect(res.toponymName).toBe("Capetown");
            })
            .catch((error) => console.log("Error : ", error));
    })
})