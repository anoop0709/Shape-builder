# React App with Parcel

A simple React application bundled with Parcel.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Project Structure

- `src/index.html` - HTML entry point
- `src/index.js` - JavaScript entry point
- `src/App.js` - React component
- `src/App.css` - Component styles
- `package.json` - Project dependencies and scripts

## Features

- React 18
- Parcel bundler with hot module replacement
- CSS support
- ESM modules

## Description

- user can input any 2d array with values 1 and 0
- app will build a shape with that 2d array
- user can click on any box and once completed all the boxes will unclick in the same   order of click.

- ex: user create an array of [[1,1,1], [1,0,0], [1,1,1]] will create a C shape then only clicable in 1 values.