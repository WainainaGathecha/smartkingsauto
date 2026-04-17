// Never run this script again or it will duplicate everything 

const db = require('./database');
const tyres = require('../src/tyres.json');

console.log('Seeding database with tyre data...');

const insert = db.prepare(`
    INSERT INTO tyres (brand, size, price, vehicleType, condition, dscription, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

// Use a transaction - either all inserts or none do
const insertAll = db.transaction((tyres) => {
    for (const tyre of  tyres) {
        insert.run(
            tyre.brand, 
            tyre.size,
            tyre.price,
            tyre.vehicleType,
            tyre.condition,
            tyre.description || '',
            tyre.image || ''
        );
    }
});

insertAll(tyres);
console.log(`Successfully inserted ${tyres.length} tyres into the database.`);