process.on("message", (message) => {
  const result = list_random(message);

  process.send(result);
});

const list_random = (cantEnv) => {
  let lista = [];
  let randoms = {};
  for (let i = 1; i <= cantEnv; i++) {
    const min = Math.ceil(1);
    const max = Math.floor(1000);
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    lista.push(random);
  }

  randoms = lista.reduce(
    (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
    {}
  );

  return { randoms };
};
