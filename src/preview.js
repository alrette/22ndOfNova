// True only in preview builds (VITE_PREVIEW=1). The deployed site never shows preview helpers.
export const PREVIEW = import.meta.env.VITE_PREVIEW === '1';
