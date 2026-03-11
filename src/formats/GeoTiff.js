import GeoTIFF from "ol/source/GeoTIFF";
import WebGLTileLayer from "ol/layer/WebGLTile";
import Overlay from "ol/Overlay";
import { transformExtent } from "ol/proj";

export default async (olMap, content, config) => {

    // ==========================================
    // 1. DATA LAYER (Hidden, for raw hover values)
    // ==========================================
    const dataSource = new GeoTIFF({
        sources: [{ blob: content }],
        convertToRGB: false,
        interpolate: false,
        normalize: false
    });

    const dataLayer = new WebGLTileLayer({
        source: dataSource,
        opacity: 0
    });
    olMap.addLayer(dataLayer);


    // ==========================================
    // 2. VISUAL LAYER (Visible, for seeing the map)
    // ==========================================
    const visualSource = new GeoTIFF({
        sources: [{ blob: content }],
        convertToRGB: config.convertToRGB ?? 'auto',
        interpolate: false,
    });

    const visualLayer = new WebGLTileLayer({
        source: visualSource,
    });
    olMap.addLayer(visualLayer);

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
        z-index: 1000;
    `;

    const overlay = new Overlay({
        element: tooltipEl,
        offset: [10, 0],
        positioning: 'bottom-left',
    });
    olMap.addOverlay(overlay);

    const srcView = await visualSource.getView();
    const dstView = await olMap.getView();

    dstView.fit(
        transformExtent(srcView.extent, srcView.projection, dstView.getProjection()),
        { padding: [10, 10, 10, 10] }
    );

    olMap.on("pointermove", (event) => {
        const data = dataLayer.getData(event.pixel);

        if (data) {
            tooltipEl.innerText = data.join ? `Value: ${data.join(', ')}` : `Value: ${data}`;
            overlay.setPosition(event.coordinate);
            tooltipEl.style.display = 'block';
        } else {
            tooltipEl.style.display = 'none';
        }
    });
};
