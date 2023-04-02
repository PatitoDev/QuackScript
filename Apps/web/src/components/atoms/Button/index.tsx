import styled, { css } from 'styled-components';

export type ButtonVariant = 'solid' | 'outline';

const Button = styled.button<{
    variant?: ButtonVariant
}>`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 16px 26px;
    font-size: 20px;
    font-weight: bold;

    ${({ variant = 'solid', theme }) => variant === 'outline' && css`
        box-shadow: inset 0 0 0 4px ${theme.colors.primary};
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
        outline: none;
        background-color: ${({ theme }) => theme.colors.darkGray};
        box-shadow: inset 0 0 0 4px ${({ theme }) => theme.colors.darkGray};
    }
`;

export default Button;