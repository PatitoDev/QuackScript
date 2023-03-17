import CodeSection from '../HomeSections/CodeSection';
import CompaniesSection from '../HomeSections/CompaniesSection';
import GameDemoSection from '../HomeSections/GameDemoSection';
import MainHome from '../HomeSections/Main';
import PlatformSection from '../HomeSections/PlatformSection';
import StatsSection from '../HomeSections/StatsSection';

const Home = () => (
    <>
        <MainHome />
        <CodeSection />
        <StatsSection />
        <GameDemoSection />
        <PlatformSection />
        <CompaniesSection />
    </>
);

export default Home;