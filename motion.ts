export const clamp = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
export const smooth = (value: number): number => { const t = clamp(value); return t * t * (3 - 2 * t); };
export function sceneProgress(top: number, height: number, viewport: number, pinned: boolean): number {
  return pinned ? clamp(-top / Math.max(height - viewport, 1)) : clamp((viewport * .8 - top) / Math.max(height + viewport * .3, 1));
}
export function assemblyState(progress: number): { assembled: number; opening: number } {
  return { assembled: smooth((progress - .15) / .55), opening: smooth((progress - .7) / .3) };
}
export function projectState(progress: number): number { return smooth((progress - .12) / .65); }
export function joyStoryState(progress: number) {
  const p = clamp(progress);
  return {
    walk: smooth(p / .20), sit: smooth((p - .20) / .15),
    screenFocus: smooth((p - .35) / .12),
    typing: clamp((p - .48) / .16),
    keyboardFocus: smooth((p - .64) / .035) * (1 - smooth((p - .72) / .065)),
    enterPress: smooth((p - .665) / .012) * (1 - smooth((p - .697) / .012)),
    homepage: smooth((p - .72) / .055),
    beat: p < .20 ? 0 : p < .35 ? 1 : p < .64 ? 2 : p < .72 ? 3 : 4,
  };
}
