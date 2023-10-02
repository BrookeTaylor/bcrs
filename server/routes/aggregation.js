/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Group 2 - Brooke Taylor, Janis Gonzalez, & Brett Grashorn
 *  Date: 10/01/2023
 *  Description: testing aggregation
 */

const { mongo } = require('../utilis/mongo');

async function graph() {
    try {
        const pipeline = [
            {
                '$unwind': '$lineItems'
            },
            {
                '$group': {
                    '_id': {
                        'title': '$lineItems.title',
                        'price': '$lineItems.price'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            },
            {
                '$sort': {
                    '_id.title': 1
                }
            }
        ];

        await mongo(async (db) => {
            const aggCursor = db.collection("invoices").aggregate(pipeline);
            const results = await aggCursor.toArray();

            results.forEach(item => {
                console.log(`${item._id.title}: ${item._id.price} (Count: ${item.count})`);
            });

        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

//graph();
module.exports = graph;

