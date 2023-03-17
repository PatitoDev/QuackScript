import styled from 'styled-components';
import Section from '../../../template/Section';

export const MainContainer = styled(Section)`
    justify-content: center;
    max-height: 760px;
    overflow: hidden;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50% !important;
    max-width: 803px; 
    align-items: flex-start;
    > * {
        margin-bottom: 0.5rem;
    }
`;

export const Image = styled.div`
    width: 50%;
    position: relative;
    left: 0;
    bottom: 0;
    width: 918px;
    height: 656px;
    > img {
        min-width: 1068px;
        min-height: 1040px;
        aspect-ratio: 1 / 1;
    }
`;