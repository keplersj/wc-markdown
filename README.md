# webcomponent-markdown

[![npm](https://img.shields.io/npm/v/webcomponent-markdown)](https://www.npmjs.com/package/webcomponent-markdown)
[![npm](https://img.shields.io/npm/dw/webcomponent-markdown)](https://www.npmjs.com/package/webcomponent-markdown)
[![Codecov](https://img.shields.io/codecov/c/github/keplersj/wc-markdown)](https://app.codecov.io/gh/keplersj/wc-markdown)

[Web Component](https://www.webcomponents.org/) for [Markdown](https://commonmark.org/help/) using [Remark](https://unifiedjs.com/explore/project/remarkjs/remark/).

## Beta and Experimental Software

This library and the component it contains should be considered beta and experimental at this time, and should not be used in production unless you are comfortable with this risk.

## Why?

ES Modules and Web Components are stable and readily available now. We should be utilizing these tools and moving the web forward in an open manner.

You like writing in Markdown. Instead of writing and rendering your Markdown to HTML ahead of time, speed up your time to publish and let the platform render your markdown.

Using remark in a web component allows you to publish your writing quickly and easily, without giving up the ability to customize that Remark and the [Unified ecosystem](https://unifiedjs.com/) enables.

Due to the nature of Web Components this can be used in any framework (React, Vue, etc.)

## Install

This package is ESM only.

It can be installed using npm and a bundler:

```sh
npm install webcomponent-markdown
```

Or added directly to a page using a npm CDN ([skypack](https://www.skypack.dev/), etc.):

```html
<script
  type="module"
  src="https://cdn.skypack.dev/webcomponent-markdown"
></script>
```

## Usage

After installation simply add the `<remark-markdown>` element to your web page and provide the URL of or embed a copy of your Markdown document:

### Linked Markdown Document

The element will fetch and render the content of your document when provided with a valid `src` attribute.

```html
<remark-markdown src="./index.md"></remark-markdown>
```

### Embedded Markdown Document

The element will render out an embedded copy of your document when provided in a `script` child, with a `"content"` slot.

```html
<remark-markdown>
  <script slot="content" type="text/markdown">
    # Hello world

    This is an example of an embedded Markdown document, rendered using Remark!
  </script>
</remark-markdown>
```

### Linking vs. Embedding

If the element is provided both a source URL and an embedded document, it will only render the embedded document and not fetch and render the specified URL.

### Plugins

The renderer can be extended using both [Remark Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) and [Rehype Plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md) by providing the component with an Array of your plugins with the `remarkPlugins` and `rehypePlugins` attributes.

An example use case from a React-like environment:

```jsx
import remarkFrontmatter from "remark-frontmatter";
import emoji from "remark-emoji";
import rehypePicture from "rehype-picture";
import slug from "rehype-slug";

const Markdown = ({ content }) => (
  <remark-markdown
    remarkPlugins={[remarkFrontmatter, emoji]}
    rehypePlugins={[
      [
        rehypePicture,
        {
          jpg: { webp: "image/webp" },
          png: { svg: "image/svg+xml" },
        },
      ],
      slug,
    ]}
  >
    <script slot="content" type="text/markdown">
      {content}
    </script>
  </remark-markdown>
);
```

## License

Copyright 2021 [Kepler Sticka-Jones](https://keplersj.com). Licensed ISC.
