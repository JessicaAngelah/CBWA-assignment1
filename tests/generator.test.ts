import { generateTabsHTML, Tab } from "../src/lib/generator";

function makeTabs(n: number): Tab[] {
  return Array.from({ length: n }).map((_, i) => ({
    title: `Tab ${i+1}`,
    content: `Content for tab ${i+1}`,
    output: `Output for tab ${i+1}`
  }));
}

describe("generateTabsHTML", () => {
  const examples = [
    { name: "one tab", tabs: makeTabs(1) },
    { name: "three tabs", tabs: makeTabs(3) },
    { name: "five tabs", tabs: makeTabs(5) },
  ];

  test.each(examples)("A: contains headings for %s", ({ tabs }) => {
    const html = generateTabsHTML(tabs, 0);
    // check doctype
    expect(html.startsWith("<!DOCTYPE html>")).toBeTruthy();
    // each title present
    for (const t of tabs) {
      expect(html).toContain(t.title);
    }
    // active tab content present
    expect(html).toContain(tabs[0].content);
  });

  test.each(examples)("B: inline styles only and no class attributes for %s", ({ tabs }) => {
    const html = generateTabsHTML(tabs, 1);
    // ensure there's inline style attribute in body and elements
    expect(html).toMatch(/style="[^"]+"/);
    // ensure there are no class="..." (there should be none in output)
    expect(html).not.toMatch(/class\s*=\s*"/);
  });
});
