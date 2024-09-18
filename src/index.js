import WrapperComponent from "./WrapperComponent";
import Config from "./Config";
import merge from "lodash.merge";


const SwaggerUiMapPlugin = (config={}) => (/*system*/) => {
    config = merge(new Config(), config);

    return {
        wrapComponents: {
            responseBody: WrapperComponent(config)
        }
    }
};
window.SwaggerUiMapPlugin = SwaggerUiMapPlugin;

export default SwaggerUiMapPlugin;