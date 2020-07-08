import 'regenerator-runtime/runtime'

//MOCK GET request geonames
const geonames_ = async (location) => {
    if (location) {
        return Promise.resolve({
            toponymName: "Capetown",
            countryId: "933860",
            fcl: "P",
            population: 0,
            countryCode: "BW",
        });
    } else {
        return null;
    }
}

export { geonames_ }