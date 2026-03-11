import GeoTIFF from "ol/source/GeoTIFF";
import WebGLTileLayer from "ol/layer/WebGLTile";
import Overlay from "ol/Overlay";
import { transformExtent } from "ol/proj";

export default async (olMap, content, config) => {
    const source = new GeoTIFF({
        sources: [{ blob: content }],
        convertToRGB: config.convertToRGB ?? 'auto',
        interpolate: false
    });

    const layer = new WebGLTileLayer({ source });
    olMap.addLayer(layer);

    const tooltipEl = document.createElement('div');
    tooltipEl.style.cssText = `
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-family: sans-serif;
        font-size: 12px;
        pointer-events: none;
        white-space: nowrap;
    `;

    const overlay = new Overlay({
        element: tooltipEl,
        offset: [10, 0],
        positioning: 'bottom-left',
    });
    olMap.addOverlay(overlay);

    const srcView = await source.getView();
    const dstView = await olMap.getView();

    dstView.fit(
        transformExtent(srcView.extent, srcView.projection, dstView.getProjection()),
        { padding: [10, 10, 10, 10] }
    );

    olMap.on("pointermove", (event) => {
        const data = layer.getData(event.pixel);
        console.log(data)

        if (data) {
            tooltipEl.innerText = Array.isArray(data) ? `Value: ${data.join(', ')}` : `Value: ${data}`;
            overlay.setPosition(event.coordinate);
            tooltipEl.style.display = 'block';
        } else {
            tooltipEl.style.display = 'none';
        }
    });
};