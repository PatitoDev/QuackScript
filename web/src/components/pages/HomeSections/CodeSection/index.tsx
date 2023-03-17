import Typography from '../../../atoms/Typography';
import QuackScriptEditor from '../../../organism/QuackScriptEditor';
import Section from '../../../template/Section';

const CodeSection = () => (
    <Section direction="column" bgColor="white">
        <header>
            <Typography textColor="black" variant="heading">
                The power of JS in the palm of your hand
            </Typography>
            <Typography textColor="black" variant="body" block mb="1em">
                QuackScript compiles to native JS, providing you the fastest code possible
            </Typography>
        </header>
        <QuackScriptEditor />
    </Section>
);

export default CodeSection;