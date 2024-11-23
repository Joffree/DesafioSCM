const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5001; // Porta alterada para 5001

app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json());

app.post('/orders', (req, res) => {
  const newOrder = req.body;

  fs.readFile('orders.json', 'utf8', (err, data) => {
    let orders = [];
    if (err) {
      if (err.code === 'ENOENT') {
        // Se o arquivo não existir, inicialize com um array vazio
        orders = [];
      } else {
        console.error('Erro ao ler o arquivo JSON:', err);
        return res.status(500).send('Erro ao salvar o pedido');
      }
    } else {
      try {
        orders = JSON.parse(data);
      } catch (parseError) {
        console.error('Erro ao analisar o arquivo JSON:', parseError);
        return res.status(500).send('Erro ao salvar o pedido');
      }
    }

    orders.push(newOrder);

    fs.writeFile('orders.json', JSON.stringify(orders, null, 4), (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo JSON:', err);
        return res.status(500).send('Erro ao salvar o pedido');
      }

      res.status(201).send(newOrder);
    });
  });
});

app.get('/orders', (req, res) => {
  fs.readFile('orders.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(200).send([]);
      } else {
        console.error('Erro ao ler o arquivo JSON:', err);
        return res.status(500).send('Erro ao buscar pedidos');
      }
    }

    try {
      const orders = JSON.parse(data);
      res.status(200).send(orders);
    } catch (parseError) {
      console.error('Erro ao analisar o arquivo JSON:', parseError);
      res.status(500).send('Erro ao buscar pedidos');
    }
  });
});

app.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const updatedOrder = req.body;

  fs.readFile('orders.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Pedido não encontrado');
      } else {
        console.error('Erro ao ler o arquivo JSON:', err);
        return res.status(500).send('Erro ao atualizar o pedido');
      }
    }

    let orders;
    try {
      orders = JSON.parse(data);
    } catch (parseError) {
      console.error('Erro ao analisar o arquivo JSON:', parseError);
      return res.status(500).send('Erro ao atualizar o pedido');
    }

    const orderIndex = orders.findIndex(order => order.codigo_produto === id);
    if (orderIndex === -1) {
      return res.status(404).send('Pedido não encontrado');
    }

    orders[orderIndex] = updatedOrder;

    fs.writeFile('orders.json', JSON.stringify(orders, null, 4), (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo JSON:', err);
        return res.status(500).send('Erro ao atualizar o pedido');
      }

      res.status(200).send(updatedOrder);
    });
  });
});

app.delete('/orders/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('orders.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Pedido não encontrado');
      } else {
        console.error('Erro ao ler o arquivo JSON:', err);
        return res.status(500).send('Erro ao excluir o pedido');
      }
    }

    let orders;
    try {
      orders = JSON.parse(data);
    } catch (parseError) {
      console.error('Erro ao analisar o arquivo JSON:', parseError);
      return res.status(500).send('Erro ao excluir o pedido');
    }

    const updatedOrders = orders.filter(order => order.codigo_produto !== id);

    fs.writeFile('orders.json', JSON.stringify(updatedOrders, null, 4), (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo JSON:', err);
        return res.status(500).send('Erro ao excluir o pedido');
      }

      res.status(200).send('Pedido excluído com sucesso');
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});