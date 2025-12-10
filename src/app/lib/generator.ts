export function generateTabsHTML(tabs: string[], active: number) {
  return `
    <html>
      <body>
        <div>
          ${tabs
            .map(
              (t, i) => `
                <button style="padding:10px; margin:5px; ${
                  i === active ? "background:pink" : ""
                }">
                  ${t}
                </button>
              `
            )
            .join("")}
        </div>
      </body>
    </html>
  `;
}
