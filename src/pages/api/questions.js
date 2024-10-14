import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'src/questions.json');
  const jsonData = fs.readFileSync(filePath);
  const questions = JSON.parse(jsonData);
  
  res.status(200).json(questions);
}
