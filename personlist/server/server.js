const jsonServer = require("json-server");
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const personData = require("./data/persons");

server.get("/api/persons", (req, res, next) => {
  res.status(200).send(personData.findAll());
});

server.post("/api/persons", (req, res, next) => {
  res.status(200).send(personData.save(req.body));
});

server.put("/api/persons/:id", (req, res, next) => {
  const existById = personData.existById(req.params.id);
  if (existById) res.status(200).send(personData.update(req.params.id, req.body));
  else res.status(404).send("Not Found");
});

server.get("/api/persons/:id", (req, res, next) => {
  const singlePerson = personData.findById(req.params.id);
  if (singlePerson?.id == req.params.id) res.status(200).send(singlePerson);
  else res.status(404).send("Not Found");
});

server.delete("/api/persons/:id", (req, res, next) => {
  const existById = personData.existById(req.params.id);
  if (existById) res.status(200).send(personData.deleteById(req.params.id));
  else res.status(404).send("Not Found");
});

server.listen(3000, () => {
  console.log("JSON server listening on port 3000");
});
