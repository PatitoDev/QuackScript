import { BsDiscord, AiFillGithub } from 'react-icons/all';
import Link from '../../atoms/Link';
import * as S from './style';

const Header = () => (
    <S.Container>
        <img src='img/QuackScriptLogoHorizontal.png' alt='logo' />
        <S.NavigationContainer>
            <Link selected>
                Home
            </Link>
            <Link>
                Docs
            </Link>
            <Link>
                Example
            </Link>

            <BsDiscord />
            <AiFillGithub />
        </S.NavigationContainer>
    </S.Container>
);

export default Header;