import styled, { css } from 'styled-components';

export const Container = styled.header`
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    padding: 2em 3em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
    @media screen and (${({ theme }) => theme.media.mobile}) {
        padding: 1em 1.2em;
    }
`;

export const BoundsCountainer = styled.div`
    margin: auto;
    max-width: ${({ theme }) => theme.sizes.desktopMaxWidth};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const NavigationContainer = styled.nav`
    display: flex;
    align-items: center;
    > * {
        margin: 0.5em;
    }
    @media screen and (${({ theme }) => theme.media.mobile}) {
        display: none;
    }
`;

export const NavImage = styled.img`
    width: 200px;
    @media screen and (${({ theme }) => theme.media.mobile}) {
        width: 60px;
    }
`;

export const MobileMenu = styled.div<{
    isOpen?: boolean
}>`
    @media screen and not (${({ theme }) => theme.media.mobile}) {
        display: none;
    }

    overflow: auto;
    z-index: 99;
    background-color: ${({ theme }) => theme.colors.black };
    width: 100vw;
    height: calc(100vh - 81px);
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;

    transition: left 0.5s ease-in-out;
    left: 101vw;

    ${({ isOpen }) => isOpen && css`
        left: 0;
    `}
`;

export const MobileMenuLink = styled.a<{
    selected?: boolean
}>`
    text-align: center;
    width: 100vw;
    padding: 2em;
    margin: 1em 0;

    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    font-size: 18px;
    text-decoration: none;

    ${({ selected = false, theme }) => selected && css`
        > span {
            box-shadow: ${theme.colors.primary} 0 5px 0px;
        }
    `}

    :hover > span {
        box-shadow: ${({ theme }) => theme.colors.primary} 0 5px 0px;
        color: ${({ theme }) => theme.colors.white};
    }
`;