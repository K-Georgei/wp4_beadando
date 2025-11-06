# Szerelem Gyros - Webprogramozás IV Projekt

Ez a projekt egy modern, Angular keretrendszerre épülő webshop alkalmazás, amely a "Szerelem Gyros" fiktív étterem online rendelési felületét valósítja meg.

## Előfeltételek

A projekt futtatásához és fejlesztéséhez a következő eszközökre van szükség:

- **Node.js**: Ajánlott a legfrissebb LTS (Long-Term Support) verzió használata (pl. 20.x vagy újabb).
- **npm**: A Node.js csomagkezelője, ami a Node.js-sel együtt települ.
- **Angular CLI**: Az Angular parancssori eszköze. Telepítése globálisan:
  ```bash
  npm install -g @angular/cli
  ```

---

## Projekt Struktúra és Főbb Mappák

A projekt az Angular közösség által javasolt, jól strukturált felépítést követi a könnyű karbantarthatóság és átláthatóság érdekében.

- **`src/app/components`**: Itt találhatóak az alkalmazás újrafelhasználható UI komponensei. Minden komponens saját mappában helyezkedik el, tartalmazva a TypeScript logikát (`.ts`), a HTML sablont (`.html`) és a CSS stíluslapot (`.css`). Például: `item-card`, `navigation`, `search-and-filter`.
- **`src/app/core`**: Az alkalmazás központi, egyetlen példányban létező szolgáltatásait (services) tartalmazza. Ilyen például a `cart.service.ts` (a kosár állapotának kezelése) és a `loader.service.ts` (adatok betöltése).
- **`src/app/models`**: A projektben használt adatstruktúrák TypeScript interfészei (`Product`, `Menu`, `MenuItem` stb.) találhatók itt. Ezek biztosítják a típusbiztonságot az alkalmazásban.
- **`src/app/pipes`**: Egyedi adat-transzformációs csatornák (pipes) helye. Például a `product-filter.pipe.ts` felelős a termékek kereséséért és szűréséért.
- **`src/assets`**: Statikus fájlok, mint például képek (`/images`) és a fő adatforrásként szolgáló `szerelem-gyros.json` (`/data`) tárolója.
- **`angular.json`**: Az Angular CLI fő konfigurációs fájlja. Itt vannak definiálva a build-folyamatok, a méretkorlátok (budgets) és egyéb projekt-specifikus beállítások.

### Hogyan történik a TypeScript fordítása?

A TypeScript (`.ts`) fájlok fordítását JavaScriptre **automatikusan az Angular CLI végzi a háttérben**, amikor az `ng serve` vagy `ng build` parancsot futtatjuk. A fejlesztőnek nem kell manuálisan fordítania a fájlokat. Az `ng serve` parancs egy memóriában lévő, gyors fejlesztői szervert indít, míg az `ng build` egy optimalizált, böngészők által futtatható JavaScript csomagot hoz létre a `dist/` mappába.

---

## Fejlesztői Környezet Telepítése és Futtatása

Ezekkel a lépésekkel tudod elindítani a projektet helyi fejlesztői szerveren.

1. **Projekt Letöltése (Klónozása)**
   Töltsd le a projektet a Git segítségével:

   ```bash
   git clone https://github.com/K-Georgei/wp4_beadando.git
   cd wp4_beadando/szerelem-gyros
   ```
2. **Függőségek Telepítése**
   A projekt gyökérmappájában futtasd a következő parancsot. Ez letölti az összes szükséges csomagot a `node_modules` mappába.

   ```bash
   npm install
   ```
3. **Fejlesztői Szerver Indítása**
   Indítsd el a helyi szervert. Ez automatikusan lefordítja a TypeScript kódot és elindítja az alkalmazást.

   ```bash
   ng serve
   ```

   Az alkalmazás elérhetővé válik a böngészőben a következő címen: **[http://localhost:4200/](http://localhost:4200/)**.

---

## "Produkciós" Build (Final Product) Létrehozása és Tesztelése

Ezek a lépések létrehozzák az optimalizált, telepítésre kész verziót.

1. **Projekt Buildelése**
   Futtasd a build parancsot. Ez létrehozza a `dist/` mappát, ami a kész alkalmazás minden fájlját tartalmazza.

   ```bash
   ng build
   ```
   *Megjegyzés: Ha a build "budget" hibával leáll, az `angular.json` fájlban növelni kell a méretkorlátokat a `budgets` szekció alatt.*
2. **A Kész Alkalmazás (dist) Helyi Tesztelése**
   A `dist` mappa tartalmának futtatásához egy egyszerű webszerverre van szükség.

   a. **Telepíts egy egyszerű webszervert** (ha még nincs):

   ```bash
   npm install -g http-server
   ```
   b. **Navigálj a buildelt alkalmazás mappájába:**

   ```bash
   cd dist/szerelem-gyros/browser
   ```
   c. **Indítsd el a szervert:**

   ```bash
   http-server -P http://localhost:8080?
   ```
   d. **Nyisd meg a böngészőben:**
   Az alkalmazás elérhető lesz a terminálban kiírt címen: **[http://localhost:8080](http://localhost:8080)**.
