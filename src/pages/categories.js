import Link from 'next/link';


const categories = [
  { id: 'general-knowledge', name: 'Cultura Generala' },
  { id: 'movies', name: 'Filme' },
  { id: 'history', name: 'Istorie' },
  { id: 'sports', name: 'Sport' },
  { id: 'world-geography', name: 'Geografie' },
];

export default function Categories() {
  return (
    <div className='container'>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link className='categories-link' href={`/quiz/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
