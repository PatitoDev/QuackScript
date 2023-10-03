import { createGlobalStyle } from 'styled-components';
import Header from './components/organism/Header';
import Home from './components/pages/Home';

const GlobalStyle = createGlobalStyle`
    html, body {
        min-height: 100vh;
        background-color: ${({ theme }) => theme.colors.white};
    }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Home />
        </>
    );
}

export default App;
