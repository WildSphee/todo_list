import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log request URLs
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express', message: 'Hello there!' });
});

interface User {
  id: number;
  name: string;
}

app.get('/api/users', (req: Request, res: Response) => {
  const users: User[] = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  res.json(users);
});

app.post('/api/users', (req: Request, res: Response) => {
  const newUser: User = req.body;
  // Normally you would save the user to a database here
  res.status(201).json(newUser);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});