import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import * as S from './style';
import Duck from '../../../atoms/Duck';

const MainHome = () => (
    <S.MainContainer>
        <S.Container>
            <Typography 
                variant="title" 
                textColor="primary"
            >QuackScript</Typography>
            <Typography 
                variant="title" 
            >game development has never been this easy</Typography>
            <Typography
                variant="body" 
                textColor="gray"
            >Game ready and compatible with web and mobile devices</Typography>
            <Button variant="outline" >Get Started</Button>
        </S.Container>
        <S.Image>
            <Duck />
        </S.Image> 
    </S.MainContainer>
);

export default MainHome;