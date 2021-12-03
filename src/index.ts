import {
  c,
  h,
  useEffect,
  useState,
  html,
  useRef,
  VDom,
  VDomType,
} from "atomico";
import { Plugin, unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Root, toH } from "hast-to-hyperscript";
import { useSlot } from "@atomico/hooks/use-slot";
import stripIndent from "strip-indent";

interface Attributes extends HTMLElement {
  src?: string;
}

const rehypeVdom: Plugin<
  any[],
  Root,
  VDom<VDomType, unknown, unknown>
> = function () {
  Object.assign(this, {
    Compiler: (tree: Root) => {
      return toH(h, tree);
    },
  });
};

const remarkProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeVdom);

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
