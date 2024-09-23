# SwaggerUI Map Plugin
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

Run `npm install` and then `npm run dev`.

For deployment, build the `dist/swagger-ui-map-plugin.js` with `npm run build` and run `npm publish --access public` to publish.