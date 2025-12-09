exports.handler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : {};
  const tabs = body.tabs || [{ title: "Tab 1", content: "Hello" }];
  const active = body.active || 0;
  const html = `<!DOCTYPE html> ...`; // reuse same generator string
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html
  };
};
