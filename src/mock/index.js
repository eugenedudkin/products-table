module.exports = () => {
    const faker = require("faker");
    const { delivery } = require("./delivery.json")
    const [...citiesArr] = delivery.map((item) => item.cities).flat();
    const rndItems = (arr) => {
        return arr.filter(item => Math.floor(Math.random() * 2))
    }
    const arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push(
            { 
                id: i + 1,
                name: faker.commerce.product(),
                quantity: faker.datatype.number(),
                email: faker.internet.email(),
                price: faker.datatype.float(),
                delivery: rndItems(citiesArr)
            }
        )
    }
    return { 
        data: arr,
        delivery,
        test: citiesArr
    };
}
