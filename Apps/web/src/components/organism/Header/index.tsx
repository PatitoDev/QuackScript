import { BiMenu } from 'react-icons/all';
import Link from '../../atoms/Link';
import * as S from './style';
import Button from '../../atoms/Button';
import { useEffect, useState } from 'react';
import { createGlobalStyle, useTheme } from 'styled-components';

const routes: Array<{
    displayName: React.ReactNode,
    route: string
}> = [
    { displayName: 'Home', route: '/' },
    { displayName: 'Docs', route: '/docs' },
    { displayName: 'Github', route: 'https://github.com/niv3k-el-pato/quackscript' },
];

const OverflowDisabled = createGlobalStyle`
    html {
        overflow: hidden;
    }
`;

const Header = () => {
    const theme = useTheme();
    const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState<boolean>(false);

    useEffect(() => {
        if (!isMobileMenuOpen) return;
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        });
    }, [isMobileMenuOpen]);

    return (
        <S.Container>
            { isMobileMenuOpen && <OverflowDisabled /> }
            <S.BoundsCountainer>
                <picture>
                    <source srcSet='img/QuackScriptLogoHorizontalSm.png' media={`(${theme.media.mobile})`} />
                    <S.NavImage src='img/QuackScriptLogoHorizontal.png' alt='logo' />
                </picture>
                <Button type="button" aria-label="menu" name='Menu' size="sm" onClick={() => setIsMobileMenuOpen((v) => !v)} variant='outline' mobileOnly >
                    <BiMenu size="2em" />
                </Button>
                <S.NavigationContainer>
                    {
                        routes.map((route) => (
                            <Link selected={route.route === '/'} href={route.route} key={route.route}>
                                {route.displayName}
                            </Link>
                        ))
                    }
                </S.NavigationContainer>
            </S.BoundsCountainer>
            <S.MobileMenu isOpen={isMobileMenuOpen}>
                {
                    routes.map((route) => (
                        <S.MobileMenuLink selected={route.route === '/'} href={route.route} key={route.route}>
                            <span>
                                {route.displayName}
                            </span>
                        </S.MobileMenuLink>
                    ))
                }
            </S.MobileMenu>
        </S.Container>
    );
};

export default Header;