import { STAIC_LABEL_ZH } from '@/const/STATIC_LABEL';
import type { staticLabelInterface } from '@/types/interface/commInterface';
import { Locale, type LocaleType } from '@/types/type/commType';
import { create } from 'zustand'




export interface g0001Interface {
    staticLabel: staticLabelInterface;
    setStaticLabel: (language: staticLabelInterface) => void;
    languageType: LocaleType;
    setLanguageType: (language: LocaleType) => void;
}


export const useG0001Store = create<g0001Interface>((set) => ({
    staticLabel: STAIC_LABEL_ZH,
    setStaticLabel: (staticLabel: staticLabelInterface) => set({ staticLabel: staticLabel }),
    languageType: Locale.ZH,
    setLanguageType: (language: LocaleType) => set({ languageType: language }),
}))