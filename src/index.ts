import { c, h, useEffect, useState, html } from "atomico";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkVdom from "remark-vdom";

interface Attributes extends HTMLElement {
  src?: string;
}

const remarkProcessor = unified().use(remarkParse).use(remarkVdom, { h: h });

export function RemarkMarkdownWC({ src }: Attributes) {
  const [content, setContent] = useState<string>();

  useEffect(() => {
    async function run() {
      if (src) {
        const fetchedContent = await fetch(src);
        setContent(await fetchedContent.text());
      }
    }

    run();
  }, [src]);

  return html`<host shadow
    >${remarkProcessor.processSync(content).result}</host
  >`;
}

RemarkMarkdownWC.props = {
  src: String,
};

customElements.define("remark-markdown", c(RemarkMarkdownWC));
