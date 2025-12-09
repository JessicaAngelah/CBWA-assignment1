export type Tab = { title: string; content: string; output?: string };

export function generateTabsHTML(tabs: Tab[], activeIndex = 0) {
  const safe = (s: string) => s?.replace(/</g, "&lt;").replace(/>/g, "&gt;") ?? "";
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Tabs Demo</title>
</head>
<body style="font-family: Arial, sans-serif; background:#ffe4e9; padding:20px;">
  <div style="display:flex; gap:20px;">
    <div style="flex:1; border:2px solid black; border-radius:8px; padding:10px; background:#ffdcdc;">
      <h3 style="margin:0 0 10px 0;">Tabs</h3>
      ${tabs.map((t, i) => `<button style="display:block; width:100%; margin-bottom:5px; padding:6px; border:1px solid #ccc; border-radius:4px; background:${i===activeIndex? '#ef88ad':'#fff2eb'}; font-weight:${i===activeIndex? 'bold':'normal'};">${safe(t.title)}</button>`).join("")}
    </div>

    <div style="flex:2; border:2px solid black; border-radius:8px; padding:10px; background:#ffdcdc;">
      <h3>${safe(tabs[activeIndex]?.title ?? '')}</h3>
      <p>${safe(tabs[activeIndex]?.content ?? '')}</p>
    </div>

    <div style="flex:1; border:2px solid black; border-radius:8px; padding:10px; background:#ffdcdc;">
      <h3>Output</h3>
      <p>${safe(tabs[activeIndex]?.output ?? '')}</p>
    </div>
  </div>
</body>
</html>`;
}
