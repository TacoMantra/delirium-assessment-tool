import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import StyledCard from '~/components/StyledCard';
import getQuestionByOrder from '~/queries/getQuestionByOrder';
import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    redirect,
} from '@remix-run/node';
import { Form, useLoaderData, useParams } from '@remix-run/react';
import AppAppBar from '~/components/AppAppBar';
import { useEffect, useState } from 'react';
import answerQuestion from '~/queries/answerQuestion';

export async function loader({ params }: LoaderFunctionArgs) {
    const questionOrder = Number(params.order);
    const patientId = String(params.patientId);

    const question = await getQuestionByOrder(questionOrder, patientId);

    return question;
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const patientId = String(params.patientId);
    const questionId = Number(formData.get('questionId'));
    const response = String(formData.get('response') ?? '');
    const questionOrder = Number(params.order);

    await answerQuestion(patientId, questionId, response);

    return redirect(`/patients/${patientId}/questions/${questionOrder + 1}`);
}

export default function Question() {
    const question = useLoaderData<typeof loader>();
    const params = useParams();

    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        setValue('');
    }, [params.order]);

    return (
        <>
            <AppAppBar isAuthed={true} />
            <Container maxWidth={'md'}>
                <StyledCard variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        {question.title}
                    </Typography>
                    <Typography>{question.content}</Typography>
                    <Form method="post">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: 3,
                            }}
                        >
                            {question.answerFormat.name === 'confusionLevel' ? (
                                <FormControl>
                                    <FormLabel id="confusionLevelLabel">
                                        {'Confusion level'}
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="confusionLevelLabel"
                                        name="yesNoGroup"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="Alert"
                                            control={<Radio />}
                                            label="Alert"
                                        />
                                        <FormControlLabel
                                            value="Vigilant"
                                            control={<Radio />}
                                            label="Vigilant"
                                        />
                                        <FormControlLabel
                                            value="Lethargic"
                                            control={<Radio />}
                                            label="Lethargic"
                                        />
                                        <FormControlLabel
                                            value="Stupor"
                                            control={<Radio />}
                                            label="Stupor"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            ) : (
                                <FormControl>
                                    <FormLabel id="yesNoLabel">
                                        Yes or No
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="yesNoLabel"
                                        name="yesNoGroup"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="Yes"
                                            control={<Radio />}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value="No"
                                            control={<Radio />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!value}
                            >
                                Submit
                            </Button>
                        </Box>
                        <input type="hidden" name={'response'} value={value} />
                        <input
                            type="hidden"
                            name={'questionId'}
                            value={question.id}
                        />
                    </Form>
                </StyledCard>
            </Container>
        </>
    );
}
