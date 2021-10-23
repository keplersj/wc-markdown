import fetchMock from "jest-fetch-mock";
import { html } from "atomico";
import { fixture } from "atomico/test-dom";
import { findByText } from "@testing-library/dom";
import "./index.js";

describe("Remark-Markdown Web Component", () => {
  it("renders basic component", async () => {
    const component = fixture(html`<remark-markdown></remark-markdown>`);

    await (component as any).updated;

    expect(component.outerHTML).toMatchSnapshot();
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

    await findByText(component.parentElement!, "Test");

    expect(component.outerHTML).toMatchSnapshot();
  });
});
