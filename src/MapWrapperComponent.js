import {Map as OlMap, View} from "ol";
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {GeoJSON} from "ol/format";
import VectorSource from "ol/source/Vector";
import {VectorImage} from "ol/layer";
import {Fill, Stroke, Style} from "ol/style";

export default (Original, system) => (props) => {
    const React = system.React;

    const mapContainer = React.createRef();
    const isGeoJson = props.contentType && props.contentType.includes('application/geo+json');

    React.useEffect(() => {
        if (isGeoJson) {
            const raster = new TileLayer({
                source: new OSM(),
            });

            const features = new GeoJSON().readFeatures(JSON.parse(props.content));

            features.forEach(function (feature) {
                feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
            });

            const source = new VectorSource({
                features: features,
            });

            const vector = new VectorImage({
                source: source,
                style: (feature) => new Style({
                    stroke: new Stroke({
                        color: feature.getProperties().stroke || 'black',
                        width: 3,
                    }),
                    fill: new Fill({
                        color: feature.getProperties().fill || 'black',
                    }),
                }),
            });

            const olMap = new OlMap({
                layers: [raster, vector],
                target: mapContainer.current,
                view: new View({
                    center: [0, 0],
                    zoom: 2,
                }),
            });

            olMap.getView().fit(source.getExtent());
        }
    }, []);

    return (
        <div>
            {isGeoJson && (
                <div style={{height: '400px', marginBottom: '10px'}}>
                    <div
                        ref={mapContainer}
                        style={{width: '100%', height: '100%'}}
                    />
                </div>
            )}
            <Original {...props} />
        </div>
    );
};