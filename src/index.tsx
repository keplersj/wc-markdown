import { c, useEffect } from "atomico";
import { Plugin } from "unified";
import { useRemark } from "atomico-use-remark";
import { useChildNodes } from "@atomico/hooks/use-child-nodes";
import stripIndent from "strip-indent";

interface Attributes {
  src?: string;
  remarkPlugins?: Plugin[];
  rehypePlugins?: Plugin[];
}

function RemarkMarkdownWC({ src, remarkPlugins, rehypePlugins }: Attributes) {
  const [tree, setContent] = useRemark("", {
    remarkPlugins,
    rehypePlugins,
  });
  const [inlineContentChildNodes] = useChildNodes();

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

  return <host>{tree}</host>;
}

RemarkMarkdownWC.props = {
  src: String,
  remarkPlugins: Array,
  rehypePlugins: Array,
};

export const RemarkMarkdown = c(RemarkMarkdownWC);

customElements.define("remark-markdown", RemarkMarkdown);
