import styled, { css } from 'styled-components';

const Link = styled.a<{
    selected?: boolean
}>`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    font-size: 20px;

    ${({ selected = false, theme }) => selected && css`
        box-shadow: ${theme.colors.primary} 0 5px 0px;
    `}
    
    :hover {
        box-shadow: ${({ theme }) => theme.colors.primary} 0 5px 0px;
        color: ${({ theme }) => theme.colors.white};
    }
`;

export default Link;