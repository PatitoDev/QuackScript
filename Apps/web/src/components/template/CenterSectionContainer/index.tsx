import styled from 'styled-components';


export const CenterSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: ${({ theme }) => theme.sizes.desktopMaxWidth};
  width: 100%;
  margin: auto;

  @media screen and (${({ theme }) => theme.media.mobile}) {
    max-width: 100%;
  }

  @media screen and not (${({ theme }) => theme.media.mobile}) {
    padding: 0 2em;
  }
`;