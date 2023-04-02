import styled from 'styled-components';
import Button from '../../../atoms/Button';
import Section from '../../../template/Section';

export const MainContainer = styled(Section)`
    justify-content: center;
    max-height: 700px;
    overflow: hidden;
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
`;