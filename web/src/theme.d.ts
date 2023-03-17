import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
        primary: string,
        black: string,
        gray: string,
        darkGray: string,
        white: string
    }
  }
}