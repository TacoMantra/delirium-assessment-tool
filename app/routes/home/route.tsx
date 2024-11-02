// import { type LoaderFunctionArgs } from '@remix-run/node';
// import { useLoaderData } from '@remix-run/react';
// import { requireAuthCookie } from '~/auth/auth';
// import { getHomeData } from './queries';
import AppAppBar from '~/components/AppAppBar';

export const meta = () => {
    return [{ title: 'Home' }];
};

// export async function loader({ request }: LoaderFunctionArgs) {
//     const userId = await requireAuthCookie(request);
//     const patients = await getHomeData(userId);
//     return { patients };
// }

export default function Home() {
    return (
        <div className="h-full">
            <AppAppBar />
        </div>
    );
}

// function Patients() {
//     const { patients } = useLoaderData<typeof loader>();
//     return (
//             <div className="p-8">
//                 <h2 className="font-bold mb-2 text-xl">Patients</h2>
//                 <nav className="flex flex-wrap gap-8">
//                     {patients.map((patient) => (
//                         <h2 key={`${patient.firstname} ${patient.lastname}`}>
//                             {`${patient.firstname} ${patient.lastname}`}
//                         </h2>
//                     ))}
//                 </nav>
//             </div>
//     );
// }
