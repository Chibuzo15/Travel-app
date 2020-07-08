import { app, post_location } from '../client/js/app'

describe("Testing the app function", () => {
    test("App Must be a function", () => {
        expect(typeof app).toBe("function");
    })

    test('Check if post Location API works well', () => {
        return post_location('London','2020-07-10').then(data => {
            expect(data).toHaveProperty('image')
        });
      });
});