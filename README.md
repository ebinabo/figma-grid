A library that helps developers draw a Layout Grid like the ones on Figma.

# Installation

## Using node.js
`yarn add figma-grid` / `npm install figma-grid`

## From a CDN
`<script src="https://cdn.jsdelivr.net/npm/figma-grid/dist/index.min.js"></script>`


# Usage
`const fg = new FigmaGrid()` uses the [default props](#default-props)

If you would like to overwrite any of the default props, `FigmaGrid()` instance takes in a single object with the props shown below. 

The **read only fields** are still under consideration and may be editable in a later release

## Default Props
```
const fg = new FigmaGrid({
    color: 'hsla(0, 100%, 50%, .1)',
    layout: 'grid', // *grid|column|row*

    size: 8, // size of grid boxes if layout: 'grid'

    // layout: 'column|row'
    count: 5, // number of rows or columns
    gutter: 20, // gutter between rows or columns
    margin: 0,

    // read only fields!
    type: 'Stretch',
    width: 'auto'
})
```

### Known Issues

- There might be unexpected behaviour if your default styling is not reset. You could fix this by adding this at the top of your css file

```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```