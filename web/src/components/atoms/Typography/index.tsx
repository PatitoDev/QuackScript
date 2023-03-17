import Styled, { css, DefaultTheme } from 'styled-components';

export type TypographyVariant = 'title' | 'heading' | 'body' | 'info';

const Typography = Styled.span<{
    variant?: TypographyVariant,
    textColor?: keyof DefaultTheme['colors'],
    weight?: 'bold' | 'normal',
    block?: boolean,
    mb?: string,
}>`
    font-family: Poppins;

    ${({ mb }) => mb && css`
        margin-bottom: ${mb};
    `}

    ${({ block }) => block && css`
        display: block;
    `}

    ${({ theme, textColor = 'white' }) =>  css`
        color: ${theme.colors[textColor]};
    `}

    ${({ variant = 'body' }) => variant === 'title' && css`
        font-size: 42px;
        font-weight: bold;
    `}

    ${({ variant = 'body' }) => variant === 'heading' && css`
        font-size: 32px;
        font-weight: bold;
    `}

    ${({ variant = 'body' }) => variant === 'body' && css`
        font-size: 18px;
    `}

    ${({ variant = 'body' }) => variant === 'info' && css`
        font-size: 14px;
    `}

    ${({ weight }) => weight && css`
        font-weight: ${weight};
    `}
`;

export default Typography;