import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Clients).values([
		{id: 1, name: 'John Doe', age: 30, isActive: true},
		{id: 2, name: 'Janna Deo', age: 35, isActive: false},
		{id: 3, name: 'Doe Joe', age: 32, isActive: true},
		{id: 4, name: 'Pere Pi', age: 33, isActive: true},
		{id: 5, name: 'Marta Mas', age: 29, isActive: false},
	]);

	const posts = await getCollection('blog');
	
	await db.insert(Posts).values(
		posts.map ( p => ({
			id: p.id,
			title: p.data.title,
			likes: Math.round(Math.random() * 100),
		}))
	);





	console.log('Seeded data');
}
