import {
  c,
  h,
  useEffect,
  useState,
  useRef,
  VDom,
  VDomType,
  useMemo,
} from "atomico";
import { Plugin, unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Root, toH } from "hast-to-hyperscript";
import { useChildNodes } from "@atomico/hooks/use-child-nodes";
import stripIndent from "strip-indent";

interface Attributes extends HTMLElement {
  src?: string;
  remarkPlugins?: Plugin[];
  rehypePlugins?: Plugin[];
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

function RemarkMarkdownWC({ src, remarkPlugins, rehypePlugins }: Attributes) {
  const [content, setContent] = useState<string>();
  const [inlineContentChildNodes] = useChildNodes();

  const remarkProcessor = useMemo(
    () =>
      unified()
        .use(remarkParse)
        .use(remarkPlugins || [])
        .use(remarkRehype)
        .use(rehypePlugins || [])
        .use(rehypeVdom),
    [remarkPlugins, rehypePlugins]
  );

  useEffect(() => {
    async function run() {
      if (inlineContentChildNodes && inlineContentChildNodes.length !== 0) {
        const contentNode = inlineContentChildNodes.filter(
          (node) =>
            (node as HTMLScriptElement).localName === "script" &&
            (node as HTMLScriptElement).type === "text/markdown" &&
            (node as HTMLSelectElement).slot === "content"
        )[0];

        setContent(stripIndent(contentNode?.textContent || ""));
      } else if (src) {
        const fetchedContent = await fetch(src);
        setContent(await fetchedContent.text());
      }
    }

    run();
  }, [src, inlineContentChildNodes]);

  return <host>{remarkProcessor.processSync(content).result}</host>;
}

RemarkMarkdownWC.props = {
  src: String,
  remarkPlugins: Array,
  rehypePlugins: Array,
};

export const RemarkMarkdown = c(RemarkMarkdownWC);

customElements.define("remark-markdown", RemarkMarkdown);
