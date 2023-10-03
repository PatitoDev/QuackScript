import styled from 'styled-components';
import Button from '../../../atoms/Button';
import Section from '../../../template/Section';

export const MainContainer = styled(Section)`
    position: relative;
    justify-content: center;
    max-height: 700px;
    overflow: hidden;
    @media screen and (${({ theme }) => theme.media.mobile}) {
        padding: 3em 2em;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > * {
        margin-bottom: 0.5rem;
    }
    > ${Button} {
        margin-top: 5em;
    }
`;

export const Image = styled.div`
    transition: left 0.5s ease-in-out;
    position: relative;
    left: 0;
    bottom: 0;
    width: 791px;
    height: 507px;
    > img {
        min-width: 1068px;
        min-height: 1040px;
        aspect-ratio: 1 / 1;
    }
    @media screen and (${({ theme }) => theme.media.mobile}) {
        bottom: 0;
        position: absolute;
        left: calc(100vw - 249px);
        height: 438px;
        > svg {
            width: 26em;
        }
    }
`;