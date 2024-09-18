
export default class Config {
    mapHeight='400px';
    renderer = {
        'geojson': {
            activationFnc: props => ['application/geo+json'].includes(props.contentType),
            format: 'GeoJson',
            config: {
                sourceProjection: 'EPSG:4326',
                defaultStrokeColor: 'black',
                defaultStrokeWidth: 1,
                defaultFillColor: 'black',
            }
        }
    }
}