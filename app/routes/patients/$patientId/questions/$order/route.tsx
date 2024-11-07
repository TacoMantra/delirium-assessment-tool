import { Container, Typography } from '@mui/material';
import StyledCard from '~/components/StyledCard';
import { getQuestionByOrder } from './queries';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderFunctionArgs) {
    const questionOrder = Number(params.order);
    const patientId = String(params.patientId);

    const question = await getQuestionByOrder(questionOrder, patientId);

    return question;
}

export default function Question() {
    const question = useLoaderData<typeof loader>();

    return (
        <>
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
                </StyledCard>
            </Container>
        </>
    );
}
