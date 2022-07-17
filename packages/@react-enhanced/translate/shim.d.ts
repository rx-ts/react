declare namespace i18n {
  export interface Translations {
    en: import('./src/types.js').Translation
    zh: import('./src/types.js').Translation
  }

  // eslint-disable-next-line no-restricted-syntax
  export type I18n = Translations
}
