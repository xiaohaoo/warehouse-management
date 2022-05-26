import WebpackBar from "webpackbar";

module.exports = {
    webpack: {
        plugins: [new WebpackBar({ color: "#845EC2" })],
        configure: (webpackConfig: any) => {
            webpackConfig.output.publicPath = "";
            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: require("craco-less"),
            options: {
                cssLoaderOptions: {
                    modules: {
                        exportLocalsConvention: "camelCase",
                        auto: true,
                    },
                    sourceMap: true,
                },
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: {},
                    },
                },
                miniCssExtractPluginOptions: {
                    publicPath: "../../",
                },
            },
        },
    ],
};
