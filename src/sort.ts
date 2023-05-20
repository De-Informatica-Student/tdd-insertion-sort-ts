// Maak een sorteer functie aan, deze gaan we testen
export function sort(array: number[]) {
    // Maak een kopie van de input array
    // We willen de input array niet wijzigen
    let result = [...array];

    // Ga over alle items in het resultaat
    for (let i = 1; i < result.length; i++) {
        // Sla de sleutel op, dit is het element dat we nu sorteren
        const key = result[i];

        // De searchIndex is de plek waarmee we de key vergelijken
        let searchIndex = i - 1;

        // Blijf herhalen zolang er items zijn en de key kleiner is dan het huidige item
        while (searchIndex >= 0 && key < result[searchIndex]) {
            // Schuif het huidige item een plek op naar rechts
            result[searchIndex + 1] = result[searchIndex];

            // Verlaag de searchindex
            searchIndex -= 1;
        }

        // We hebben de plek gevonden, plaats de key daar
        result[searchIndex + 1] = key
    }

    // Geef de array terug
    return result;
}