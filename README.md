# wc-markdown

[Web Component](https://www.webcomponents.org/) for [Markdown](https://commonmark.org/help/) using [Remark](https://unifiedjs.com/explore/project/remarkjs/remark/).

## Beta and Experimental Software

This library and the component it contains should be considered beta and experimental at this time, and should not be used in production unless you are comfortable with this risk.

## Why?

ES Modules and Web Components are stable and readily available now. We should be utilizing these tools and moving the web forward in an open manner.

You like writing in Markdown. Instead of writing and rendering your Markdown to HTML ahead of time, speed up your time to publish and let the platform render your markdown.

Using remark in a web component allows you to publish your writing quickly and easily, without giving up the ability to customize Remark and the [Unified ecosystem](https://unifiedjs.com/) enables.

## Install

This package is ESM only.

It can be installed using npm and a bundler:

```sh
npm install wc-markdown
```

Or added directly to a page using a npm CDN ([skypack](https://www.skypack.dev/), etc.):

```html
<script type="module" src="https://cdn.skypack.dev/wc-markdown"></script>
```

## Usage

After installation simply add the `<wc-markdown>` element to your web page and specify the URL of your Markdown document:

```html
<wc-markdown src="./index.md"></wc-markdown>
```

Due to the nature of Web Components this can be done using any framework (React, Vue, etc.)

## License

Copyright 2021 [Kepler Sticka-Jones](https://keplersj.com). Licensed ISC.
