import { usersData } from '../constants';


export async function getStaticProps(ctx) {
	try {
        const res: Response = await fetch(usersData);
        const data = await res.json();

        if (!data) {
            return {
                notFound: true,
            };
        }
        console.log(data);
        return {
            notFound: false,
            users: data
        }
    } catch (error) {
        return {
            notFound: true,
            users: []
        }
	};
}
