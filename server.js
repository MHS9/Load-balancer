const body = require('body-parser');
const express = require('express');
const fs = require('fs')
const app1 = express();
const app2 = express();

// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());
const riddles=[
  {
    riddle:"What has to be broken before you can use it?",
    answer:"an egg"

  },
  {
    riddle:" I’m tall when I’m young, and I’m short when I’m old. What am I?",
    answer:"candle"

  },
  {
    riddle:"What month of the year has 28 days?",
    answer:"All of them"
  },
  {
    riddle:"What is full of holes but still holds water?",
    answer:"A sponge"

  },
  {
    riddle:"What question can you never answer yes to?",
    answer:"Are you asleep yet?"

  }

]

const handler = serverNum => (req, res) => {
  let id
  const bro=serverNum==1?2:1
  console.log(`server ${serverNum}`, req.method, req.url, req.body);
  if (req.url!="/"){
    id=parseInt(req.url.replace("/",""))
    res.send(`Hey is server ${serverNum} here! My bro server ${bro}, send you?? I am glad!
    \n Here is the answer you are looking for: ${riddles[id].answer}
    \n , I hope you guessed it! :)`)
    res.end()
  }
  else{ 
    id=Math.floor(Math.random() * riddles.length)
    const riddle = riddles[id]
    res.send(`Hello from server ${serverNum}!
    \n Guess this riddle:${riddle.riddle}\n
    Go to my brother @ http://localhost:8080/${id} to find out the answer! `)
    res.end()
  
  
  

  res.end()

  }
 
  
};

// Only handle GET and POST requests
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));

app1.listen(3000);
app2.listen(3001);