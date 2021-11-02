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

    await findByText(component.parentElement!, "Test").catch((e) =>
      console.error(e)
    );

    expect(component).toMatchSnapshot();
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();
  });
});
