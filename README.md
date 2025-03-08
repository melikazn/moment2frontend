# Todo List Application

## Projektöversikt

Detta är en Todo-listapplikation som använder **React** för frontend och en **Node.js/Express**-backend för att hantera Todo-uppgifter. Applikationen låter användaren lägga till, uppdatera och ta bort Todo-uppgifter, samt hålla reda på deras status (`Ej påbörjad`, `Pågående`, `Avklarad`).

## Teknologier

### Frontend
- **React**: Används för att bygga användargränssnittet (UI) och hantera tillstånd med `useState` och `useEffect`.
- **CSS**: För att styla komponenterna och göra applikationen responsiv.
- **Axios**: För att hantera HTTP-anrop till backend (GET, POST, PUT, DELETE).

### Backend
- **Node.js** och **Express**: Används för att skapa en REST API som hanterar Todo-uppgifter.

## Funktioner

- **Lägga till en Todo**: Användare kan lägga till en ny uppgift med titel och beskrivning.
- **Uppdatera Todo-status**: Användare kan uppdatera statusen på en uppgift (Ej påbörjad, Pågående, Avklarad).
- **Ta bort en Todo**: Användare kan ta bort en Todo-uppgift från listan.
- **Validering**: Applikationen validerar input innan en Todo sparas (titel minst 3 tecken, beskrivning max 200 tecken).
- **Framgångsmeddelanden**: Efter att en Todo har lagts till visas ett framgångsmeddelande som försvinner efter 3 sekunder.
- **Felhantering**: Vid eventuella fel vid API-anrop visas felmeddelanden för användaren.
