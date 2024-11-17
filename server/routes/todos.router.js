//! may need to change one of these if not functioning
const router = require('express').Router();
const pool = require('../modules/pool');

//Will need routers for each request

//GET to get all todo items
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      //?may need to change res.send to target correct data
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting todos in router', error);
      res.sendStatus(500);
    });
  });

//POST to add a new todo item
//request body must be an object with text and isComplete
router.post('/',  (req, res) => {
    let newTodo = req.body;
    console.log(`Adding todo item in router`, newTodo);
  //queryText will add newTodo to db in the given format
    let queryText = `INSERT INTO "todos" ("text", "isComplete")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newTodo.text, newTodo.isComplete])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new todo in router`, error);
        res.sendStatus(500);
      });
  });

//DELETE removes todo item.  Request must include a parameter indicating
//what item to remove with -id
router.delete( '/', ( req, res )=>{
    console.log( 'delete from router', req.body );
        // assemble query
        const queryText = `DELETE FROM todos WHERE id=$1;`;
        const values = [ req.body.id ];
        // run pool.query
        pool.query( queryText, values ).then( ( results )=>{
            res.sendStatus( 200 ); // "OK"
        }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 400 );
        })
  })

  router.put( '/', ( req, res )=>{
    console.log( '/todos PUT:', req.body );
    const queryText = `UPDATE todos SET isComplete=$1 WHERE id=$2;`;
    // this is the same newReady_To_Tramsfer in client PUT 
    const values = [  req.body.isComplete , req.body.id  ];
    // run pool.query
    pool.query( queryText, values ).then( ( results )=>{
        res.sendStatus( 200 ); // "OK"
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })})

    module.exports = router;
