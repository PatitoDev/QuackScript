import { AiFillGithub } from 'react-icons/all';
import Link from '../../atoms/Link';
import * as S from './style';

const Header = () => (
    <S.Container>
        <img src='img/QuackScriptLogoHorizontal.png' alt='logo' />
        <S.NavigationContainer>
            <Link selected>
                Home
            </Link>
            <Link href="/docs">
                Docs
            </Link>

            <Link href="https://github.com/niv3k-el-pato/quackscript">
                <AiFillGithub />
            </Link>
        </S.NavigationContainer>
    </S.Container>
);

export default Header;