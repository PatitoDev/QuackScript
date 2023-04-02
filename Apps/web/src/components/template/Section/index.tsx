import styled, { css, DefaultTheme } from 'styled-components';

const Section = styled.section<{
    bgColor?: keyof DefaultTheme['colors']
    variant?: 'md' | 'sm',
    direction?: 'row' | 'column'
    center?: boolean,
}>`
    display: flex;
    flex-direction: ${({ direction = 'row' }) => direction};
    background-color: ${({ theme, bgColor = 'black' }) => theme.colors[bgColor] };
    padding: 120px;
    ${({ variant ='sm' }) => variant === 'sm' && css`
        padding: 120px 260px;
    `};

    ${({ center }) => center && css`
        justify-content: center;
        align-items: center;
    `}
`;

export default Section;