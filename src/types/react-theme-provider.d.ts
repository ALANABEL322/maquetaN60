declare module 'react-theme-provider' {
  export interface Theme {
    theme: 'light' | 'dark'
  }

  export function useTheme(): Theme
}
