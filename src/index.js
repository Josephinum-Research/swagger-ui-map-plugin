import MapWrapperComponent from "./MapWrapperComponent";


const SwaggerUiMapPlugin = (/*system*/) => {
    return {
        wrapComponents: {
            responseBody: MapWrapperComponent
        }
    }
};
window.SwaggerUiMapPlugin = SwaggerUiMapPlugin;

export default SwaggerUiMapPlugin;