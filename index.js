import express from "express"

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

app.post("/teas", (req,res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
})
app.get("/teas", (req, res) => {
    res.status(200).send(teaData);
})

// get by id

app.get("/teas/:id", (req, res) => {
    const tea = teaData.find(i => i.id === parseInt(req.params.id));
    if (!tea) {
        res.status(404).send("Tea not found");
    }
    res.status(201).send(tea);
})
// update the array
app.put("/teas/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        res.status(404).send("Not found");
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

// delete the id

app.delete("/teas/:id", (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("not found")
    }
    teaData.splice(index, 1);
    return res.status(200).send("Delleted")
})
app.listen(port, () => {

    console.log(`server is running ${port}...`);
    
})


