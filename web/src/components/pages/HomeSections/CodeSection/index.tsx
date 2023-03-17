import Typography from '../../../atoms/Typography';
import QuackScriptEditor from '../../../organism/QuackScriptEditor';
import Section from '../../../template/Section';

const CodeSection = () => (
    <Section direction="column" bgColor="white">
        <header>
            <Typography textColor="black" variant="HEADING" weight="bold">
                The power of JS in the palm of your hand
            </Typography>
            <div>
                <Typography textColor="black" variant="BODY">
                    QuackScript compiles to native JS, providing you the fastest code possible
                </Typography>
            </div>
        </header>
        <QuackScriptEditor />
    </Section>
);

export default CodeSection;