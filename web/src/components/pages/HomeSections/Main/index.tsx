import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import * as S from './style';

const MainHome = () => (
    <S.MainContainer>
        <S.Container>
            <Typography 
                variant="TITLE" 
                textColor="primary"
                weight="bold"
            >QuackScript</Typography>
            <Typography 
                variant="TITLE" 
                textColor="white"
                weight="bold"
            >game development has never been this easy</Typography>
            <Typography
                variant="BODY" 
                textColor="gray"
            >Game ready and compatible with web and mobile devices</Typography>
            <Button variant="OUTLINE" >Get Started</Button>
        </S.Container>
        <S.Image>
            <img alt='logo' src="./img/DuckAvatarMd.png" />
        </S.Image> 
    </S.MainContainer>
);

export default MainHome;