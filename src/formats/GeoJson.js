import {GeoJSON} from "ol/format";
import VectorSource from "ol/source/Vector";
import {VectorImage} from "ol/layer";
import {Fill, Stroke, Style} from "ol/style";

export default (
    olMap,
    content,
    config
) => {
    const features = new GeoJSON().readFeatures(JSON.parse(content));

    features.forEach(function (feature) {
        feature.getGeometry().transform(config.sourceProjection || 'EPSG:4326', 'EPSG:3857');
    });

    const source = new VectorSource({
        features: features,
    });

    const style = (feature) => new Style({
        stroke: new Stroke({
            color: feature.getProperties().stroke || config.defaultStrokeColor,
            width: feature.getProperties().strokeWidth || config.defaultStrokeWidth,
        }),
        fill: new Fill({
            color: feature.getProperties().fill || config.defaultFillColor,
        }),
    });

    const layer = new VectorImage({
        source: source,
        style: style,
    });

    olMap.addLayer(layer);
    olMap.getView().fit(source.getExtent());
}