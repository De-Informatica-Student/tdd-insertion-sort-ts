# Test Driven Development voor Sorteren in TypeScript

Test Driven Development is een methodiek waarbij je de testen schrijft
voordat je begint met het schrijven van de daadwerkelijke functies.
Je begint het schrijven van code door ervoor te zorgen dat het bestand uitvoert.
In een ideale situatie zouden we altijd een test schrijven die faalt,
dit noemen we het rood-groen-herstructurer-patroon (red-green-refactor).
In persoonlijke ervaring is dit soms wat vergezocht,
maar we houden ons hier zoveel mogelijk aan.

De functie die we gaan schrijven is insertion-sort,
waarbij een nieuwe array wordt teruggeven als resultaat.

## Installeren

Voor dit project heb je een aantal dingen nodig. Node is het meest belangrijke onderdeel.
Naast TypeScript hebben we ook Tape nodig. Dit is het test framework.
Zorg ervoor dat dit is geïnstalleerd en ga in een terminal-venster naar een map voor het project.
Voor hier de volgende commando's uit:

```ps
# Installeer TypeScript globaal
npm install -g typescript

# Installeer ts-node globaal
npm install -g ts-node

# Installeer tape in het project
npm install --save-dev tape @types/tape

# Maak de mappen aan voor de typescript bestanden
mkdir src
```

TypeScript heeft daarnaast een configuratie bestand.
Maak het bestand ```tsconfig.json``` aan in de bovenste map van het project.
We geven in dit bestand aan dat we een module gaan schrijven volgens de ES6 standaard.
Er is een map voor de TS bestanden (src) en een map voor de JS bestanden (out).
Strict modus zorgt ervoor dat er geen fouten mogen worden gemaakt in types.
Daarnaast willen we een map-bestand hebben om de JS code te kunnen koppelen aan de TS code,
hierdoor krijgen we foutmeldingen op regels in het TS bestand i.p.v. het JS bestand.

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "outDir": "out",
        "rootDir": "src",
        "strict": true,
        "esModuleInterop": true,
        "sourceMap": true,
    }
}
```

## De Eerste Test

Tijd om direct de eerste test te gaan schrijven.
We hebben twee bestanden nodig in de ```src``` map.
Dit zijn ```sort.ts``` en ```sort.test.ts```.
Het eerste bestand is waar de daadwerkelijk functie komt te staan,
het tweede bestand is waar de testen in worden gezet.
We gaan beginnen met het schrijven van net genoeg code om geen foutmeldingen te krijgen.
De volgende code gaat naar ```sort.js```:

```ts
export function sort(array: number[]) {
    return null;
}
```

Er is nu net genoeg code om de compiler gelukkig te maken.
Tijd om te gaan kijken naar ```sort.test.ts```.
We beginnen met het importeren van de juiste bibliotheken,
dit zijn tape en onze sort functie.

```ts
import test from 'tape';
import { sort } from './sort';
```

En nu de test.
Het Tape framework maakt gebruik van de ```test``` functie om het doel te bereiken.
De test functie heeft als parameters de naam van de test en een functie.
Die functie heeft ook weer een parameter, het test object.
Dit object voert de testen daadwerkelijk uit.
Documentatie van het framework geeft dit de naam ```t```.
Voor het voorbeeld gebruik ik ```assert```, dit leest beter naar mijn mening.

Binnen de functie wordt de test uitgevoerd.
Omdat we zo klein mogelijk willen beginnen met testen,
is de eerste test die we gaan schrijven: 'geeft de functie een array terug'.
De eerste regel controleer of de voorwaarde ```true``` teruggeeft, dit is de test.
Deze test geven we een titel die we terug te zien krijgen als de test wordt uitgevoerd.
Dit is optioneel, maar beschrijft de test beter dan 'must be true'.
Daarna beëindigen we de test.

```ts
test('Return Array', (assert) => {
    assert.true(Array.isArray(sort([])), 'the result of the function must be an array');
    assert.end();
});
```

Vervolgens kunnen we de test gaan uitvoeren.
Aan het begin hebben we ```ts-node``` geïnstalleerd, dit gaan we nu gebruiken.
Deze bibliotheek stelt ons in staat om direct TypeScript code uit te voeren.
Dit is essentieel voor de tape bibliotheek die we aanroepen.
We geven als input het test bestand.
Als alles goed is, faalt de test.

```ps
# node  roep tape aan                met het test bestand
ts-node .\node_modules\tape\bin\tape src/sort.test.ts
```

Tijd om ervoor te zorgen dat de test slaagt.
We gaan terug naar het ```sort.ts``` bestand om dit op te lossen.
Het idee achter Test Driven Development is
dat we net genoeg code gaan schrijven om de test te laten slagen.
Om dat voor elkaar te krijgen, geven we een lege array terug.

```ts
export function sort(array: number[]) {
    return [];
}
```

## De Originele Array

Een belangrijke eis waaraan ons programma moet voldoen is
het teruggeven van een nieuwe array.
Dit wil ik graag zo snel mogelijk kunnen controleren,
dit heeft als rede dat dit de enige test is die afwijkt van het rood-groen-patroon.
Daarnaast maken we ook wat variabele aan die rest van de tijd gebruikt zullen worden.
Het volledige test bestand ziet er dan als volgt uit.

```ts
import test from 'tape';
import { sort } from './sort';

const testArray = [6, 4, 2, 3, 5, 1];
const checkTestArray = [...testArray];

test('Return Array', (assert) => {
    assert.true(Array.isArray(sort([])), 'the result of the function must be an array');
    assert.end();
});

test('Keep orginal array intact', (assert) => {
    sort(testArray);
    assert.isEquivalent(testArray, checkTestArray, 'the function should not alter the input');
    assert.end();
});
```

Er wordt een ```testArray``` aangemaakt die wordt gebruikt om de tests mee uit te voeren.
Vervolgens wordt er een kopie van die array gemaakt.
De test die is toegevoegd controleerd of beide arrays nog hetzelfde zijn.

De rede voor deze functie is een principe genaamd **verwijzingen**.
Een Array in TypeScript wordt opgeslagen in het geheugen als object.
De waarde van de variabele is een verwijzing naar het object,
niet het object zelf.
Als we in de functie iets uitvoeren als ```array[0] = 0;```,
dan is dit zichtbaar in de orginele array, overal in de code.
Dit willen voorkomen, en daarom ook testen.

## De Juiste Lengte

De volgende controle die we gaan uitvoeren op onze functie is
het controlleren van de lengte van het resultaat.
De functie moet hetzelfde aantal items teruggeven als dat het kreeg.
Hiervoor gaan we equal test uitvoeren, om twee waardes te vergelijken.

```ts
test('Return Array of same length', (assert) => {
    assert.equal(testArray.length, sort(testArray).length, 'the result should have the same length as the input');
    assert.end();
});
```

We gaan de functie hier vervolgens op aanpassen.
Dit gaan we weer doen door zo min mogelijk code te schrijven.
We breiden de code exact uit met wat de test vraag,
zonder verder te kijken naar de toekomst.
Dus we makeneen array met het juiste aantal items.

```ts
export function sort(array: number[]) {
    return Array(array.length).fill(0);
}
```

## De Juiste Items

De volgende stap is controleren of de juiste items aanwezig zijn.
We willen weten of alles correct wordt gekopiëerd.
Het moeilijk aan deze functie is herhalende items.
Functies zoals ```includes``` zijn normaal heel goed in het
controleren of een item in een reeks staat,
maar er wordt totaal geen rekening gehouden met herhalen.
Dit moeten we zelf in programmeren tijdens het maken van de test.

```ts
test('Keep the original elements', (assert) => {
    const result = sort(testArray);
    const original = [...testArray];
    let allValuesWereFound = true;

    for (let i = 0; i < result.length; i++) {
        const index = original.indexOf(result[i]);

        if (index !== -1) {
            original.splice(index, 1);
        } else {
            allValuesWereFound = false;
        }
    }

    assert.true(allValuesWereFound, 'all items of the test data must return in the result');
    assert.end();
});
```

In beginnen we met het uitvoeren van de functie.
We maken daarnaast een kopie van de test data.
Dit doen we omdat we items uit de array gaan verwijderen,
dit willen we niet in de originele data doen.
Vervolgens maken we een variabele die bepaald of de test slaagt.
De loop kijkt of een item wordt gevonden.
Als laatste wordt de daadwerkelijke controle uitgevoerd.
Voor de code kopieëren we de originele array en geven dat terug.

```ts
export function sort(array: number[]) {
    return [...array];
}
```

## Geordend

De laatste stap voor dit voorbeeld is het daadwerkelijk implementeren van het sorteren.
Dit voelt als een hele grote stap, en voor het programma is het zeker zo.
Er is echter maar zoveel dat je kan testen met in- en output.
Op dat gebied hebben we de stappen netjes genomen. De laatste test is:

```ts
test('Are the elements ordered?', (assert) => {
    const result = sort(testArray);
    let isOrdered = true;

    for (let i = 0; i < result.length - 1; i++) {
        const isSmaller = result[i] <= result[i + 1];
        isOrdered = isSmaller ? isOrdered : false;
    }
    
    assert.true(isOrdered, 'the elements should be ordered');
    assert.end();
});
```

De bijbehorende code voor het algoritme implementeren we.
Gezien het algoritme niet het onderwerp is van het voorbeeld,
heb ik comments toegevoegd aan de code om te vertellen wat er gebeurd.
Comment kun je ook terugvinden in het test bestand als je extra uitleg wilt.
Het algoritme zorgt voor het volgende resultaat:

```ts
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
```

## Uitdaging

Probeer dit nu zelf uit te breiden met extra functionaliteit.
Denk hierbij aan extra opties voor het sorteren.
Ik wil wel de originele array aanpassen óf
ik wil dat er andersom wordt gesorteerd.
Dit kun je met optionele parameters voor elkaar krijgen.
Succes!