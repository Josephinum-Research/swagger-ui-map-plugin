import {Map as OlMap, View} from "ol";
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";


export default (config) => (Original, system) => (props) => {
    const React = system.React;

    const mapContainer = React.createRef();
    const renderer = Object.values(config.renderer).filter(f => f.activationFnc(props));
    const isMapVisible = renderer.length > 0;

    if (isMapVisible) {
        React.useEffect(() => {
            const rasterLayer = new TileLayer({
                source: new OSM(),
            });

            const olMap = new OlMap({
                layers: [rasterLayer],
                target: mapContainer.current,
                view: new View({
                    center: [0, 0],
                    zoom: 2,
                }),
            });

            renderer.forEach(f => {
                import('./formats/' + f.format).then(r => r.default(olMap, props.content, f.config));
            })
        }, []);
    }

    return (
        <div>
            {isMapVisible && (
                <div style={{height: config.mapHeight, marginBottom: '10px'}}>
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