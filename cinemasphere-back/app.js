import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";
import cors from 'cors';

// TODO: Ensure only valid users can make changes

const app = express();

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors())

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

app.get('/api/Users', async (req, res) => {
    const {data, error} = await supabase
        .from('profiles')
        .select()
    res.send(data);
    if (error) console.log(error)
});

app.get('/api/Users/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('profiles')
        .select()
        .match({id: req.params.id})
    res.send(data);
});


app.put('/api/Users/:id', async (req, res) => {
    const {error} = await supabase
        .from('profiles')
        .update({
            username: req.body.username,
            full_name: req.body.full_name,
            avatar_url: req.body.avatar_url,
            website: req.body.website,
            // phone_number: req.body.phone_number,
            // email_address: req.body.email_address,
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});


app.get('/api/Movies', async (req, res) => {
    const {data, error} = await supabase
        .from('movies')
        .select()
    res.send(data);
    if (error) console.log(error)

});

app.get('/api/MoviesRanked', async (req, res) => {
    const { data, error } = await supabase
        .from('movies')
        .select('*, reviews:reviews(id, description, rating, created_by, movie_id)')
        .order('reviews.length', { ascending: false }); // Order by number of reviews

    if (error) {
        console.log(error);
        res.status(500).send('Error fetching movies');
    } else {
        // Add ranking logic
        const rankedMovies = data.map((movie, index) => ({
            ...movie,
            rank: index + 1, // Rank starts from 1
        }));
        res.send(rankedMovies);
    }
});


app.get('/api/Movies/:user_id', async (req, res) => {
    const {data, error} = await supabase
        .from('movies')
        .select()
        .match({user_id: req.params.user_id})
    res.send(data);
});

app.get('/api/Movies/movie_id/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('movies')
        .select()
        .match({id: req.params.id})
    res.send(data);
});

app.post('/api/Movies', async (req, res) => {
    const {error} = await supabase
        .from('movies')
        .insert({
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id,
            avatar_url: req.body.avatar_url,
            genres: req.body.genres,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/api/Movies/:id', async (req, res) => {
    const {error} = await supabase
        .from('movies')
        .update({
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id,
            avatar_url: req.body.avatar_url,
            genres: req.body.genres,
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/api/Movies/:id', async (req, res) => {
    const {error} = await supabase
        .from('movies')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});


app.get('/api/Reviews', async (req, res) => {
    const {data, error} = await supabase
        .from('reviews')
        .select()
    res.send(data);
    if (error) console.log(error)

});


app.get('/api/Reviews/:movie_id', async (req, res) => {
    const {data, error} = await supabase
        .from('reviews')
        .select()
        .match({movie_id: req.params.movie_id})
    res.send(data);
});

app.post('/api/Reviews', async (req, res) => {
    const {error} = await supabase
        .from('reviews')
        .insert({
            description: req.body.description,
            rating: req.body.rating,
            created_by: req.body.created_by,
            movie_id: req.body.movie_id,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/api/Reviews/:id', async (req, res) => {
    const {error} = await supabase
        .from('reviews')
        .update({
            description: req.body.description,
            rating: req.body.rating,
            created_by: req.body.created_by,
            movie_id: req.body.movie_id,
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/api/Reviews/:id', async (req, res) => {
    const {error} = await supabase
        .from('reviews')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});


app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(5000, () => {
    console.log(`> Ready on http://localhost:5000`);
});