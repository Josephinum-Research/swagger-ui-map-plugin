import {Map as OlMap, View} from "ol";
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";


export default (config) => (Original, system) => (props) => {
    const React = system.React;
    const mapRenderer = Object.values(config.renderer).filter(f => f.activationFnc(props));
    const isActivated = mapRenderer.length > 0;
    const [showMap, setShowMap] = React.useState(false)
    const mapContainer = React.createRef();

    if (isActivated) {
        React.useEffect(() => {
            setShowMap(true);

            const rasterLayer = new TileLayer({
                source: new OSM(),
            });

            console.log(mapContainer.current);
            const map = new OlMap({
                layers: [rasterLayer],
                target: mapContainer.current,
                view: new View({
                    center: [0, 0],
                    zoom: 2,
                }),
            });

            Promise.all(mapRenderer.map(f => {
                return import('./formats/' + f.format).then(r => r.default(map, props.content, f.config));
            })).catch(error => {
                console.error(error);
                map.setTarget(null);
                setShowMap(false);
            });

            return () => {
                map.setTarget(null);
                setShowMap(false);
            }
        }, [props.content]);
    }

    return (
        <div>
            {isActivated && (
                <div style={{display: showMap ? 'block' : 'none', height: config.mapHeight, marginBottom: '10px'}}>
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