import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";

const app = express();


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

app.get('/Users', async (req, res) => {
    const {data, error} = await supabase
        .from('profiles')
        .select()
    res.send(data);
    if (error) console.log(error)
});

app.get('/Users/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('profiles')
        .select()
        .is('id', req.params.id)
    res.send(data);
});


app.put('/Users/:id', async (req, res) => {
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


app.get('/Movies', async (req, res) => {
    const {data, error} = await supabase
        .from('movies')
        .select()
    res.send(data);
    if (error) console.log(error)

});


app.get('/Movies/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('movies')
        .select()
        .is('id', req.params.id)
    res.send(data);
});

app.post('/Movies', async (req, res) => {
    const {error} = await supabase
        .from('movies')
        .insert({
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id,
        })
    if (error) {
        res.send(error);
    }
    res.send("created!!");
});

app.put('/Movies/:id', async (req, res) => {
    const {error} = await supabase
        .from('movies')
        .update({
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id,
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});

app.delete('/Movies/:id', async (req, res) => {
    const {error} = await supabase
        .from('movies')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("deleted!!")

});


app.get('/Reviews', async (req, res) => {
    const {data, error} = await supabase
        .from('reviews')
        .select()
    res.send(data);
    if (error) console.log(error)

});


app.get('/Reviews/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('reviews')
        .select()
        .is('id', req.params.id)
    res.send(data);
});

app.post('/Reviews', async (req, res) => {
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

app.put('/Reviews/:id', async (req, res) => {
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

app.delete('/Reviews/:id', async (req, res) => {
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

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});