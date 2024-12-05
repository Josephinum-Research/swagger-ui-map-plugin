# SwaggerUI Map Plugin

[![Node.js Package](https://github.com/Josephinum-Research/swagger-ui-map-plugin/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Josephinum-Research/swagger-ui-map-plugin/actions/workflows/npm-publish.yml)
[![Release](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2FJosephinum-Research%2Fswagger-ui-map-plugin%2Freleases&query=%24%5B0%5D.tag_name&style=flat&label=Release&color=blue)](https://github.com/Josephinum-Research/swagger-ui-map-plugin/releases)
[![Example](https://img.shields.io/badge/Example-orange)](https://josephinum-research.github.io/swagger-ui-map-plugin/example.html)

SwaggerUI plugin to show GeoJson responses on a map

<img src="./example.png" alt="example" width="300">


## Usage

1. Add `Openlayers` and this plugin to your swaggerui index file
```html
<script src="https://cdn.jsdelivr.net/npm/ol@v10.1.0/dist/ol.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/@josephinumresearch/swagger-ui-map-plugin/dist/swagger-ui-map-plugin.js" crossorigin></script>
```
2. Register `SwaggerUiMapPlugin()`
```javascript
SwaggerUIBundle({
    ...
    plugins: [
        SwaggerUiMapPlugin()
    ],
    ...
});
```
3. Execute a request whose response is an `application/geo+json`


## Dev

Run `npm install` and `npm run dev`.
