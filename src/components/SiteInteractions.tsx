"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Client-side behaviors ported from the source support.js runtime:
 *
 *  - Count-up: elements with [data-count] animate 0 -> target (easeOutCubic)
 *    the first time they scroll into view.
 *  - Scale-to-fit: elements with [data-scale-frame] scale their 1600px-wide
 *    inner design down to the available width, clamping the frame height.
 *
 * Rendered once per page inside PageShell; re-runs on client-side navigation
 * because it keys off the pathname.
 */
export function SiteInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // --- scroll reveal ------------------------------------------------------
    // Fade + rise each top-level page section as it enters the viewport.
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("main > *")
    );
    if (revealTargets.length) {
      if ("IntersectionObserver" in window) {
        const rio = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add("vx-in");
                rio.unobserve(en.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        revealTargets.forEach((el) => rio.observe(el));
        cleanups.push(() => rio.disconnect());
      } else {
        // No IO support: reveal everything immediately.
        revealTargets.forEach((el) => el.classList.add("vx-in"));
      }
    }

    // --- count-up -----------------------------------------------------------
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]")
    );
    if (counters.length && "IntersectionObserver" in window) {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const run = (el: HTMLElement) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        if (prefersReduced || !Number.isFinite(target)) {
          el.textContent = `${Math.round(target)}${suffix}`;
          return;
        }
        const dur = 1100;
        const t0 = performance.now();
        el.textContent = `0${suffix}`;
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * e)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              run(en.target as HTMLElement);
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // --- scale-to-fit -------------------------------------------------------
    const frames = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scale-frame]")
    );
    if (frames.length) {
      const fit = () => {
        frames.forEach((el) => {
          const inner = el.firstElementChild as HTMLElement | null;
          if (!inner) return;
          const s = el.clientWidth / 1600;
          inner.style.transform = `scale(${s})`;
          el.style.height = `${Math.round(inner.scrollHeight * s)}px`;
        });
      };

      if ("ResizeObserver" in window) {
        const ro = new ResizeObserver(fit);
        frames.forEach((el) => ro.observe(el));
        cleanups.push(() => ro.disconnect());
      }
      window.addEventListener("resize", fit);
      cleanups.push(() => window.removeEventListener("resize", fit));
      // Run after fonts settle so scrollHeight is accurate.
      fit();
      if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
