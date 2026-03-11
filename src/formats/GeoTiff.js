import GeoTIFF from "ol/source/GeoTIFF";
import WebGLTileLayer from "ol/layer/WebGLTile";
import Overlay from "ol/Overlay";
import {transformExtent} from "ol/proj";

export default async (olMap, content, config) => {


    const visualSource = new GeoTIFF({
        sources: [{blob: content}],
        convertToRGB: config.convertToRGB ?? 'auto',
        interpolate: false,
    });

    const visualLayer = new WebGLTileLayer({
        source: visualSource,
    });
    olMap.addLayer(visualLayer);

    const srcView = await visualSource.getView();
    const dstView = await olMap.getView();

    dstView.fit(
        transformExtent(srcView.extent, srcView.projection, dstView.getProjection()),
        {padding: [10, 10, 10, 10]}
    );

    // show value of pixel on mouse hover
    if (config.showValuesOnHover) {
        // this is a bit inefficient, but it's WebGL... maybe fix that in the future
        const dataLayer = new WebGLTileLayer({
            source: new GeoTIFF({
                sources: [{blob: content}],
                convertToRGB: false,
                interpolate: false,
                normalize: false
            }),
            opacity: 0
        });
        olMap.addLayer(dataLayer);

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

    }
};
