module.exports = (app) => {

    const currency = require('../controllers/currency.controller');

    // Create a new currency
    app.post('/currency', currency.create);

    // Retrieve all currency
    app.get('/currency', currency.findAll);

    // Retrieve a single currency with currencyId
    app.get('/currency/:currencyId', currency.findOne);

    // Update a currency with currencyId
    app.put('/currency/:currencyId', currency.update);

    // Delete a currency with currencyId
    app.delete('/currency/:currencyId', currency.delete);
}