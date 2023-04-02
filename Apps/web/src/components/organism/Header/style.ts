import styled from 'styled-components';

export const Container = styled.header`
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 3em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
`;

export const NavigationContainer = styled.nav`
    display: flex;
    align-items: center;
    > * {
        margin: 0.5em;
    }
`;