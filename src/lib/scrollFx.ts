/**
 * Framework-agnostic scroll effects, driven by data attributes:
 *   data-reveal     fade and rise into view (adds .is-in)
 *   data-lit        mark as reached (adds .is-in)
 *   data-count="N"  count up to N when it enters the viewport
 *   data-parallax   shift vertically while scrolling (value = speed, e.g. 0.08)
 *   data-fill       sets --fill (0 to 1) as the element scrolls through the viewport
 *   data-tilt       3D tilt following the mouse
 *   data-magnetic   gentle pull towards the mouse
 * It also keeps --progress (0 to 1, page scroll) on <html> for the energy rail.
 * Everything is skipped when the visitor prefers reduced motion.
 */
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function setText(el: HTMLElement, text: string) {
  const node = el.firstChild;
  if (node && node.nodeType === Node.TEXT_NODE) (node as Text).data = text;
  else el.textContent = text;
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const duration = 1500;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    setText(el, String(Math.round(target * eased)));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initScrollFx(): () => void {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = new WeakSet<Element>();
  const bound = new WeakSet<Element>();
  const cleanups: Array<() => void> = [];
  let parallax: HTMLElement[] = [];
  let fills: HTMLElement[] = [];
  let frame = 0;
  let scanFrame = 0;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        el.classList.add("is-in");
        if (el.hasAttribute("data-count") && !reduce) countUp(el);
      }
    },
    { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
  );

  function update() {
    frame = 0;
    const vh = window.innerHeight;
    const max = root.scrollHeight - vh;
    root.style.setProperty("--progress", (max > 0 ? clamp(window.scrollY / max, 0, 1) : 0).toFixed(4));

    for (const el of parallax) {
      if (!el.isConnected) continue;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -300 || rect.top > vh + 300) continue;
      const speed = parseFloat(el.dataset.parallax || "0.08");
      el.style.setProperty("--py", `${((rect.top + rect.height / 2 - vh / 2) * speed).toFixed(1)}px`);
    }
    for (const el of fills) {
      if (!el.isConnected) continue;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--fill", clamp((vh * 0.68 - rect.top) / Math.max(rect.height, 1), 0, 1).toFixed(3));
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function bindPointer(el: HTMLElement, kind: "tilt" | "magnetic") {
    if (bound.has(el)) return;
    bound.add(el);
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (kind === "tilt") {
        el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
      } else {
        el.style.setProperty("--mx", `${(x * 12).toFixed(1)}px`);
        el.style.setProperty("--my", `${(y * 12).toFixed(1)}px`);
      }
    };
    const leave = () => {
      if (kind === "tilt") {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      } else {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      }
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  }

  function scan() {
    scanFrame = 0;
    document.querySelectorAll<HTMLElement>("[data-reveal],[data-lit],[data-count]").forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.hasAttribute("data-count") && !reduce) setText(el, "0");
      io.observe(el);
    });
    parallax = reduce ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    fills = Array.from(document.querySelectorAll<HTMLElement>("[data-fill]"));
    if (reduce) fills.forEach((el) => el.style.setProperty("--fill", "1"));
    if (!reduce) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => bindPointer(el, "tilt"));
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => bindPointer(el, "magnetic"));
    }
    schedule();
  }

  const mutations = new MutationObserver(() => {
    if (!scanFrame) scanFrame = requestAnimationFrame(scan);
  });
  mutations.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  scan();

  return () => {
    io.disconnect();
    mutations.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame) cancelAnimationFrame(frame);
    if (scanFrame) cancelAnimationFrame(scanFrame);
    cleanups.forEach((fn) => fn());
  };
}
