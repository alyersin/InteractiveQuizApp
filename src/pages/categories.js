// categories.js
import Link from 'next/link';

const categories = [
  { id: 'general-knowledge', name: 'Cultura Generala' },
  { id: 'movies', name: 'Filme' },
  { id: 'history', name: 'Istorie' },
  { id: 'sports', name: 'Sport' },
  { id: 'music', name: 'Muzica' },
  { id: 'animals', name: 'Animale' },
  { id: 'science', name: 'Stiinta' },
  { id: 'geography', name: 'Geografie' },
  { id: 'yes_no', name: 'Intrebare da/nu' },
  { id: 'technology', name: 'Tehnologie' },
];
console.log(categories);

export default function Categories() {
  console.log(categories); 
  
  return (
    <div className='container'>
      <ul className='categories-ul'>
        {categories.map(category => (
          <li className='categories-li' key={category.id}>
            <Link className='categories-link' href={`/quiz/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
