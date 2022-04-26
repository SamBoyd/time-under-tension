module.exports = async () => {
    return {
        verbose: true,
        rootDir: './',
        transformIgnorePatterns: [
            "/node_modules/(?!@react-native|react-native|react-dom|redux-persist|@rneui|@miblanchard)"
        ],
        preset: "react-native",
        // "jest": {
        //     "globals": {
        //         "__DEV__": true
        //     }
        // }
    };
};