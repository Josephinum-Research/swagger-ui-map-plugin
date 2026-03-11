import GeoTIFF from "ol/source/GeoTIFF";
import WebGLTileLayer from "ol/layer/WebGLTile";
import {transformExtent} from "ol/proj";

export default async (olMap, content, config) => {
    const source = new GeoTIFF({
        sources: [{blob: content}],
        convertToRGB: config.convertToRGB ?? 'auto',
        interpolate: false
    });

    const layer = new WebGLTileLayer({source});
    olMap.addLayer(layer);

    const srcView = await source.getView();
    const dstView = await olMap.getView();

    dstView.fit(transformExtent(srcView.extent, srcView.projection, dstView.getProjection()),
        { padding: [10,10,10,10]})

};
