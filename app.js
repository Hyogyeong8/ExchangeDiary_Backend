const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8000; // -- 처음에 할땐 3000이라고 하고 한 후
//localhost:3000 으로 하시는 것을 추천
//나중에 80포트를 써야 할 일이 옵니다.
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/static', express.static('public')); 

app.listen(port, () => console.log(`Server up and running on port ${port}.`));

app.get("/", (req, res) => {
  console.log('---');
  res.json({ message: "Welcome to our application." });
});


app.post("/image/get", async (req, res) => {
	const url = "https://www.ringleplus.com";
	res.json(url);
});