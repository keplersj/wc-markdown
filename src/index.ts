import { c, useEffect, useState, html, useLayoutEffect } from "atomico";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

interface Attributes extends HTMLElement {
  src?: string;
}

const remarkProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

export function RemarkMarkdownWC({ src }: Attributes) {
  const [content, setContent] = useState<string>();
  const [parsed, setParsed] = useState<string>();

  useEffect(() => {
    async function run() {
      if (src) {
        const fetchedContent = await fetch(src);
        setContent(await fetchedContent.text());
      }
    }

    run();
  }, [src]);

  useLayoutEffect(() => {
    async function run() {
      const processed = await remarkProcessor.process(content);
      setParsed(String(processed));
    }

    run();
  }, [content]);

  return html`<host shadow><div innerHTML=${parsed}></div></host>`;
}

RemarkMarkdownWC.props = {
  src: String,
};

customElements.define("remark-markdown", c(RemarkMarkdownWC));
