import Styled, { css, DefaultTheme } from 'styled-components';

export type TypographyVariant = 'TITLE' | 'HEADING' | 'BODY' | 'INFO';

const Typography = Styled.span<{
    variant?: TypographyVariant,
    textColor?: keyof DefaultTheme['colors'],
    weight?: 'bold' | 'normal'
}>`
    font-family: Poppins;
    font-weight: ${({ weight = 'normal' }) => weight};

    ${({ theme, textColor = 'white' }) =>  css`
        color: ${theme.colors[textColor]};
    `}

    ${({ variant = 'BODY' }) => variant === 'TITLE' && css`
        font-size: 64px;
    `}

    ${({ variant = 'BODY' }) => variant === 'HEADING' && css`
        font-size: 40px;
    `}

    ${({ variant = 'BODY' }) => variant === 'BODY' && css`
        font-size: 32px;
    `}

    ${({ variant = 'BODY' }) => variant === 'INFO' && css`
        font-size: 20px;
    `}
`;

export default Typography;