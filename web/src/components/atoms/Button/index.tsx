import styled, { css } from 'styled-components';

export type ButtonVariant = 'SOLID' | 'OUTLINE';

const Button = styled.button<{
    variant?: ButtonVariant
}>`
    border: none;
    border-radius: 5px;
    padding: 25px 45px;
    font-size: 36px;

    ${({ variant = 'SOLID', theme }) => variant === 'OUTLINE' && css`
        box-shadow: inset 0 0 0 7px ${theme.colors.primary};
        color: ${theme.colors.primary};
        background-color: transparent;
        :hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.black};
        }
    `}

    ${({ variant = 'SOLID', theme }) => variant === 'SOLID' && css`
        color: ${theme.colors.black};
        background-color: ${theme.colors.primary};
    `}

    :focus-within {
        outline: none;
        box-shadow: inset 0 0 0 7px ${({ theme }) => theme.colors.black};
    }
`;

export default Button;