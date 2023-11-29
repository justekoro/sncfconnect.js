<p align="center">
<img height="100" src="readme/assets/logo.svg">
</p>
<h3 align="center">Easy way to use the SNCF Connect private API.</h3>

---

# Getting started
Get started by installing the package with `npm` or `yarn`:
```bash
$ npm install sncfconnect.js # or yarn add sncfconnect.js
```

# Usage
The package is typescript ready, so you can use it with typescript or javascript. You decide!

```typescript
import Client from "sncfconnect.js";

const client = new Client({
    // Here you can pass userAgent. if you don't, one will be generated for you :)
});

(async () => {
    // The package is promise based, so you can use async/await or .then()
    const station = await client.searchStation("Genève Cornavin")

    const geneva = station.places.transportPlaces[0];

    // We get the first result :
    const genevaId = geneva.id;

    // We get the station boards :
    const boards = await client.getStationBoards(genevaId);

    // Now, we get the board for the first train in the first line :
    const board = boards.boardsByLineId[boards.station.lines[0].id];

    // We get the first train :
    const train = board.mainLineBoards.departuresBoard.items[0];

    // We get the journey details :
    const journey = await client.getTraject(train.vehicleDetails.request);

    // And now we have everything we need !
    console.log(`The next train is going to ${train.vehicleDirection.mainDirectionLabel}. It will leave on ${train.vehicleDetails.request.date} at ${train.timeLabel} from platform ${train.platformLabel}.`);
    console.log("Stops :");
    console.log(journey.lineDetailStops.map(stop => `${stop.locationLabel} at ${stop.timeLabel} (${stop.semanticDurationLabel != "" ? stop.semanticDurationLabel : "Unknown stop duration"})`).join("\n"));
})()
```

It's as easy - and everything is typed!

# Documentation

No documentation for now, but you can check the [types](src/types.ts) and the [source code](src/typings.d.ts) to see what you can do with the package.

# Contributing

Contributions are welcome! Feel free to open an issue or a pull request.

# License

This project is licensed under the [MIT License](LICENSE).

# Credits

- **THIS PACKAGE IS NOT AFFILIATED WITH SNCF IN ANY WAY.**
- Made by [**@justekoro**](https://krbk.dev) with ❤️

# Disclaimer

This package is not affiliated with SNCF in any way. It's a reverse-engineered API, so it can break at any time. Use it at your own risk.

# Donate

If you like this package, you can donate to me using :
- **ETH**: `0x3173F2bE428F53E03cFDC5A9FBaA02d89b0cBdc8`
- **SOL**: `koroAXzMAq6mkgRyjdUhWZiFHJ9SjsjtqTdybGbtPRN`
- **XMR**: `48yNudxH1acdS7mmHrP24bPpHU6vbfjAGZyVXUt8hLYjW3HyG4go8WDF5jAboFjrJpdq6xQBjKnk1Rps5PNKkEJrPRaBk3n`

Thanks a lot! ❤️
