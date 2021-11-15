import "./index";

export default {
  title: "Components/Remark",
};

export const URLProvided = () =>
  /*html*/ `<remark-markdown src="/sample.md"></remark-markdown>`;

export const InlineContentProvided = () => `
  <remark-markdown>
    <script slot="content" type="text/markdown">

      # Hello world!

      This is an example of embedded Markdown!

    </script>
  </remark-markdown>
`;
