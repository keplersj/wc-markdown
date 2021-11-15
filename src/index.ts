import { c, h, useEffect, useState, html, useRef } from "atomico";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkVdom from "remark-vdom";
import { useSlot } from "@atomico/hooks/use-slot";
import stripIndent from "strip-indent";

interface Attributes extends HTMLElement {
  src?: string;
}

const remarkProcessor = unified().use(remarkParse).use(remarkVdom, { h: h });

export function RemarkMarkdownWC({ src }: Attributes) {
  const [content, setContent] = useState<string>();
  const inlineContentRef = useRef();
  const inlineContentChildNodes = useSlot(inlineContentRef);

  useEffect(() => {
    async function run() {
      if (inlineContentChildNodes && inlineContentChildNodes.length !== 0) {
        const contentNode = inlineContentChildNodes[0];

        setContent(stripIndent(contentNode.textContent || ""));
      } else if (src) {
        const fetchedContent = await fetch(src);
        setContent(await fetchedContent.text());
      }
    }

    run();
  }, [src, inlineContentChildNodes]);

  return html`
    <host shadowDom>
      <slot name="content" ref=${inlineContentRef}>
        <script type="text/markdown"></script>
      </slot>
      ${remarkProcessor.processSync(content).result}
    </host>
  `;
}

RemarkMarkdownWC.props = {
  src: String,
};

customElements.define("remark-markdown", c(RemarkMarkdownWC));
