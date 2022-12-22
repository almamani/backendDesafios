import Message from "../class/classMessage.js";
import { normalize, schema } from "normalizr";

const messagesUsers = new Message("./data/mensajes.json");
let messages = await messagesUsers.getAll();

export default async function socketMensajes(socket, sockets) {
   //Normalizacion
  const authorSchema = new schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  );
  const postShema = new schema.Entity("post", {
    author: authorSchema,
  });
  const postsSchema = new schema.Entity("posts", {
    mensajes: [postShema],
  });
  const normMessages = normalize(messages, postsSchema);
  
  //Emisión
  socket.emit("mensajes", normMessages);

  socket.on("newMensaje", async (data) => {
    const date = new Date().toLocaleString();
    await messagesUsers.save(
      date,
      data.text,
      data.email,
      data.name,
      data.lastName,
      data.age,
      data.alias,
      data.avatar
    );

    messages = await messagesUsers.getAll();

    //Normalizacion
    const authorSchema = new schema.Entity(
      "authors",
      {},
      { idAttribute: "email" }
    );
    const postShema = new schema.Entity("post", {
      author: authorSchema,
    });
    const postsSchema = new schema.Entity("posts", {
      mensajes: [postShema],
    });
    const normMessages = normalize(messages, postsSchema);

    // Post Emisión
    sockets.emit("mensajes", normMessages);
  })
}