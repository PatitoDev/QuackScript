import styled from 'styled-components';
import { CenterSectionContainer } from '../../../template/CenterSectionContainer';

export const CodeSectionContainer = styled(CenterSectionContainer)`
  flex-direction: column;
  padding-left: 0;
  padding-right: 0;

  > * {
    margin: 0 0.8em;
  }

  > :first-child {
    margin: 0 2em;
  }
`;