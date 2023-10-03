import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import * as S from './style';
import Duck from '../../../atoms/Duck';
import { CenterSectionContainer } from '../../../template/CenterSectionContainer';

const MainHome = () => (
    <S.MainContainer>
        <CenterSectionContainer>
            <S.Container>
                <Typography 
                    variant="title" 
                    textColor="primary"
                >QuackScript</Typography>
                <Typography 
                    variant="title" 
                >the most quackstastic language ever created</Typography>
                <Typography
                    variant="body" 
                    textColor="gray"
                >Created by ducks for ducks</Typography>
                <Button onClick={() => location.href = '/docs/#getting-started'} variant="outline" >Get Started</Button>
            </S.Container>
            <S.Image>
                <Duck />
            </S.Image> 
        </CenterSectionContainer>
    </S.MainContainer>
);

export default MainHome;