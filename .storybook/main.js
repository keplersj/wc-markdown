module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.esbuild = config.esbuild || {};
    config.esbuild.jsxFactory = "_jsx";
    config.esbuild.jsxInject = "import {h as _jsx, css as _css} from 'atomico'";

    // return the customized config
    return config;
  },
};
