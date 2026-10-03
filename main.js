// Выделил текст в ленте — он уже в буфере, Cmd/Ctrl+C не нужен (владелец: «как в терминале»). Только лента:
// в поле ввода своё выделение, Cmd+C там должен копировать обычным путём, а не мешаться с этим.
export default function register() {
  document.addEventListener("mouseup", () => {
    const sel = document.getSelection();
    if (!sel || sel.isCollapsed) return;
    const text = sel.toString();
    if (!text.trim()) return;
    const node = sel.anchorNode;
    const container = node && (node.nodeType === Node.TEXT_NODE ? node.parentElement : node);
    if (!container?.closest(".feed-inner")) return;
    navigator.clipboard?.writeText(text).catch(() => {});  // без разрешения или не тот контекст — молча: Cmd+C и так работает
  });
}
