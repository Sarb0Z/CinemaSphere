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
        .from('Profiles')
        .select()
    res.send(data);
});

app.get('/Users/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('Profiles')
        .select()
        .is('id', req.params.id)
    res.send(data);
});


app.put('/Users/:id', async (req, res) => {
    const {error} = await supabase
        .from('Profiles')
        .update({
            name: req.body.name,
            phone_number: req.body.phone_number,
            email_address: req.body.email_address,
        })
        .eq('id', req.params.id)
    if (error) {
        res.send(error);
    }
    res.send("updated!!");
});


app.get('/Users', async (req, res) => {
    const {data, error} = await supabase
        .from('Profiles')
        .select()
    res.send(data);
});


app.get('/Movies/:id', async (req, res) => {
    const {data, error} = await supabase
        .from('Movies')
        .select()
        .is('id', req.params.id)
    res.send(data);
});

app.post('/Movies', async (req, res) => {
    const {error} = await supabase
        .from('Movies')
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
        .from('Movies')
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
        .from('Movies')
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