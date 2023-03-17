import styled, { css } from 'styled-components';

export const Container = styled.div`
    margin-top: 1em;
    background-color: ${({ theme }) => theme.colors.black};
    padding: 0 0.5em 0.5em 0.5em;
    border-radius: 5px;
    max-width: 100%;
`;

export const CodeWindowContent = styled.div`
    display: flex;
    max-width: 100%;
`;

export const CodeWindowHeader = styled.div`
    width: 100%;
    padding: 1.5em 1em;
    display: flex;
    gap: 0.5em;
`;

export const Divider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-width: 2em;
    background-color: ${({ theme }) => theme.colors.black};
`;

export const WindowActionButton = styled.div<{
    variant: 'red' | 'yellow' | 'green'
}>`
    border-radius: 50%;
    width: 1em;
    height: 1em;
    ${({ variant = 'red' }) => variant === 'red' && css`
        background-color: #DF4949;
    `}

    ${({ variant = 'red' }) => variant === 'yellow' && css`
        background-color: #FFED4F;
    `}

    ${({ variant = 'red' }) => variant === 'green' && css`
        background-color: #5BD876;
    `}
`;