# The Astronomy

## Stack
  - Vue 3, Typescript, UnoCSS, unovis

## Solution  
Using the Brower's Geolocation API, I was able to read the longitude and latitude of the user and this was useful in calculating the coordinates of both the sun and the moon. I also added a datepicker which allows user to be able to view the observation of past dates. 

To allow for reusuablity, I made the function for calculating the coordinates and utility function which takes in a date, longitude and latitude. This is then used in `App.vue` through a computed properties to allow Vue recompute the calculation when the date changes.

Data is rendered using `unovis` area chart to give a graphical representation of the 24 hour cycle.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
