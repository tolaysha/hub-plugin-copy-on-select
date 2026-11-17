// Text selected in the feed is already on the clipboard, no Cmd/Ctrl+C needed (like in a terminal). The feed only:
// the input field has its own selection, and Cmd+C there must copy the usual way without this getting in the way.
export default function register() {
  document.addEventListener("mouseup", () => {
    const sel = document.getSelection();
    if (!sel || sel.isCollapsed) return;
    const text = sel.toString();
    if (!text.trim()) return;
    const node = sel.anchorNode;
    const container = node && (node.nodeType === Node.TEXT_NODE ? node.parentElement : node);
    if (!container?.closest(".feed-inner")) return;
    navigator.clipboard?.writeText(text).catch(() => {});  // no permission or not a secure context: stay silent, Cmd+C still works
  });
}
