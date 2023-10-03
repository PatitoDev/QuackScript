import styled, { css } from 'styled-components';

export type ButtonVariant = 'solid' | 'outline';

const Button = styled.button<{
    size?: 'sm' | 'md'
    variant?: ButtonVariant,
    mobileOnly?: boolean
}>`
    ${({ mobileOnly }) => mobileOnly && css`
        @media screen and not (${({ theme }) => theme.media.mobile}) {
            display: none;
        }
    `}

    @media screen and (${({ theme }) => theme.media.mobile}) {
        padding: ${({ size = 'md' }) => size === 'md' ? '1em' : '0.5em'};
        font-size: 1em;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 16px 26px;
    font-size: 20px;
    font-weight: bold;

    ${({ variant = 'solid', theme }) => variant === 'outline' && css`
        box-shadow: inset 0 0 0 4px ${theme.colors.primary};
        @media screen and (${({ theme }) => theme.media.mobile}) {
            box-shadow: inset 0 0 0 2px ${theme.colors.primary};
        }
        color: ${theme.colors.primary};
        background-color: transparent;
        :hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.black};
        }
    `}

    ${({ variant = 'solid', theme }) => variant === 'solid' && css`
        color: ${theme.colors.black};
        background-color: ${theme.colors.primary};
    `}

    :focus-within {
        outline: 3px ${({ theme }) => theme.colors.gray } solid
    }
`;

export default Button;