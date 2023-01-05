const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let popsicle = { "name": "popsicle", "price": 1.50 };

beforeEach(function () {
    db.items.push(popsicle);
});

afterEach(function () {
    db.items = [];
});
// end


/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function () {
    it("Gets a list of items", async function () {
        const resp = await request(app).get(`/items`);

        expect(resp.body).toEqual({
            "items": [
                {
                    "name": "popsicle",
                    "price": 1.50
                }
            ]
        });
    });
});
// end

/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/popsicle", function () {
    it("Gets a single item", async function () {
        const resp = await request(app).get(`/items/popsicle`);

        expect(resp.body).toEqual({
            "item": {
                "name": "popsicle",
                "price": 1.50
            }
        });
    });

    it("Responds with 404 if can't find item", async function () {
        const resp = await request(app).get(`/items/not-an-item`);
        expect(resp.statusCode).toEqual(404);
    });
});
// end

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function () {
    it("Creates a new item", async function () {
        const resp = await request(app)
            .post(`/items`)
            .send({
                "name": "taco",
                "price": 2
            });
        expect(resp.statusCode).toEqual(201); //should this be 200?
        expect(resp.body).toEqual({
            "added": {
                "name": "taco",
                "price": 2
            }
        });
    });
});
// end

/** PATCH /item/[name] - update item; return `{item: item}` */

describe("PATCH /items/popsicle", function () {
    it("Updates a single item", async function () {
        const resp = await request(app)
            .patch(`/items/popsicle`)
            .send({
                "name": "ice-cream",
                "price": 2.5
            });
        expect(resp.body).toEqual({
            updatingItem: {
                "name": "ice-cream",
                "price": 2.5
            }
        });
    });

    it("Responds with 404 if name invalid", async function () {
        const resp = await request(app).patch(`/items/you-expected-an-item-but-it-was-me`);
        expect(resp.statusCode).toEqual(404);
    });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /items/popsicle", function () {
    it("Deletes a single a item", async function () {
        const resp = await request(app)
            .delete(`/items/popsicle`);
        expect(resp.body).toEqual({ message: "Deleted" });
        expect(db.items.length).toEqual(0);
    });
});
// end
