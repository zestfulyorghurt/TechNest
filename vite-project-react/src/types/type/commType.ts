export const Locale = {
    ZH: 'zh',
    EN: 'en',
    JA: 'ja'
} as const
export type LocaleType = typeof Locale[keyof typeof Locale]