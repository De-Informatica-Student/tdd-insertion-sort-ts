// Importeer Tape, het test framework
// We geven de import de naam test, zodat we in de code test kunnen schrijven in plaats van tape
import test from 'tape';

// Importeer de functie die we willen testen
import { sort } from './sort';

// Maak een array voor test data en een kopie daarvan
// De kopie wordt gebruikt om te controleren of de test data hetzelfde blijft
const testArray = [6, 4, 2, 3, 5, 1];
const checkTestArray = [...testArray];

// Controleer of the functie een array teruggeeft als resultaat
test('Return Array', (assert) => {
    // Bekijk of het antwoord een array is
    assert.true(Array.isArray(testArray), 'the result of the function must be an array');
    
    // Einde van de test
    assert.end();
});


// Controleer of the array die we terugkrijgen dezelfde lengte heeft als de originele array
test('Return Array of same length', (assert) => {
    // Controleer de lengte van de array
    assert.equal(testArray.length, sort(testArray).length, 'the result should have the same length as the input');

    // Einde van de test
    assert.end();
});

// Controleer of de test data niet wordt aangetast
test('Keep orginal array intact', (assert) => {
    // Voer de functie uit
    sort(testArray);

    // Controleer of de test data niet is aangetast
    assert.isEquivalent(testArray, checkTestArray, 'the function should not alter the input');

    // Einde van de test
    assert.end();
});

// Controleer of alle items nog aanwezig zijn
// Deze functie is zelf geschreven om herhalende items mogelijk te maken
test('Keep the original elements', (assert) => {
    // Voer de functie uit
    const result = sort(testArray);

    // Maak een kopie van de test data
    // Deze array wordt aangepast, de test data dient dat niet
    const original = [...testArray];

    // Maak een boolean aan om te controleren of alle items zijn gevonden
    let allValuesWereFound = true;

    // Ga over alle items in het resultaat
    for (let i = 0; i < result.length; i++) {
        // Haal de index op van het huidige item
        // Als het item niet wordt gevonden, wordt dit -1
        const index = original.indexOf(result[i]);

        // Controleer of er een item is gevonden
        if (index !== -1) {
            // Dit is het geval, verwijder het item uit de controle reeks
            original.splice(index, 1);
        } else {
            // Dit is niet het geval, verander het test resultaat
            allValuesWereFound = false;
        }
    }

    // Voer de test uit
    assert.true(allValuesWereFound, 'all items of the test data must return in the result');

    // Einde van de test
    assert.end();
});

// Controleer of de items nu op volgorde staan
test('Are the elements ordered?', (assert) => {
    // Voer de functie uit
    const result = sort(testArray);

    // Maak een boolean om te controleren of alle items op volgorde staan
    let isOrdered = true;

    // Ga over alle items in het resultaat
    for (let i = 0; i < result.length - 1; i++) {
        // Controleer of het item kleiner is dan het volgende item
        const isSmaller = result[i] < result[i + 1];
        
        // Als dit niet zo is, verander het resultaat van de test
        isOrdered = isSmaller ? isOrdered : false;
    }
    
    // Controleer het resultaat
    assert.true(isOrdered, 'the elements should be ordered');

    // Het einde van de test
    assert.end();
})
