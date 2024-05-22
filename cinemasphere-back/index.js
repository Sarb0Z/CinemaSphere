import express from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import userRouter from './routers/userRouter';
import movieRouter from './routers/movieRouter';
import reviewRouter from './routers/reviewRouter';

const app = express();

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Import and use routers
app.use('/api/Users', userRouter);
app.use('/api/Movies', movieRouter);
app.use('/api/Reviews', reviewRouter);

app.get('/', (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
  res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(5000, () => {
  console.log(`> Ready on http://localhost:5000`);
});
