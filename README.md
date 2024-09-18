# SwaggerUI Map Plugin
Add a map view to supported results in the SwaggerUI.

# Usage
Add `Openlayers` and this plugin to your swaggerui index file:
```html
<script src="https://cdn.jsdelivr.net/npm/ol@v10.1.0/dist/ol.js" crossorigin></script>
<script src="swagger-ui-map-plugin.js"></script>
```
and register `SwaggerUiMapPlugin()`:
```javascript
SwaggerUIBundle({
    ...
    plugins: [
        SwaggerUiMapPlugin()
    ],
    ...
});
```

# Dev
Run `npm install` and then `npm run dev`.

For deployment, build the `dist/swagger-ui-map-plugin.js` with `npm run build`