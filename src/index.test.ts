import fetchMock from "jest-fetch-mock";
import { jest } from "@jest/globals";
import { html } from "atomico";
import { fixture } from "atomico/test-dom";
import { findByText } from "@testing-library/dom";
import "./index.js";

jest.setTimeout(10000);

describe("Remark-Markdown Web Component", () => {
  it("renders basic component", async () => {
    const component = fixture(html`<remark-markdown></remark-markdown>`);

    await (component as any).updated;

    expect(component).toMatchSnapshot();
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();
  });

  beforeEach(() => {
    fetchMock.mockResponses("# Test");
  });

  it("renders component with `src` parameter", async () => {
    const component = fixture(
      html`<remark-markdown
        src="https://raw.github.com/adamschwartz/github-markdown-kitchen-sink/master/README.md"
      ></remark-markdown>`
    );

    await findByText(component.parentElement!, "Test").catch((e) => {
      // console.error(e)
    });

    expect(component).toMatchSnapshot();
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();
  });

  it("renders component with inlined Markdown", async () => {
    const component = fixture(
      html`<remark-markdown>
        <script slot="content" type="text/markdown">
          ${`
          # Hello world!

          This is a test of inlined markdown!
          `}
        </script>
      </remark-markdown>`
    );

    await findByText(component.parentElement!, "Hello world!").catch((e) => {
      // console.error(e)
    });

    expect(component).toMatchSnapshot();
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();
  });

  it("renders empty document if inline script does not contain content", async () => {
    const component = fixture(
      html`<remark-markdown>
        <script slot="content" type="text/markdown"></script>
      </remark-markdown>`
    );

    await findByText(component.parentElement!, "Hello world!").catch((e) => {
      // console.error(e)
    });

    expect(component).toMatchSnapshot();
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();
  });

  it("renders component and uses provided plugins", async () => {
    const remarkPlugin = jest.fn();
    const remarkPluginWithOptions = jest.fn();
    const remarkPlugins = [remarkPlugin, [remarkPluginWithOptions, {}]];
    const rehypePlugin = jest.fn();
    const rehypePluginWithOptions = jest.fn();
    const rehypePlugins = [rehypePlugin, [rehypePluginWithOptions, {}]];

    const component = fixture(
      html`<remark-markdown
        remarkPlugins=${remarkPlugins}
        rehypePlugins=${rehypePlugins}
      >
        <script slot="content" type="text/markdown">
          ${`
          # Hello world!

          This is a test of inlined markdown!
          `}
        </script>
      </remark-markdown>`
    );

    await findByText(component.parentElement!, "Hello world!").catch((e) => {
      // console.error(e)
    });

    expect(component).toMatchSnapshot();
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();

    expect(remarkPlugin).toBeCalledTimes(1);
    expect(remarkPluginWithOptions).toBeCalledTimes(1);
    expect(rehypePlugin).toBeCalledTimes(1);
    expect(rehypePluginWithOptions).toBeCalledTimes(1);
  });
});
