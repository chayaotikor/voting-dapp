require("dotenv").config();
const server = require("./server");
const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${PORT}/graphiql`
  )
);
