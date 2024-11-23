import React from 'react';

const PedidoList = ({ pedidos, updatePedido, deletePedido }) => {
  return (
    <div className="pedido-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fornecedor</th>
            <th>Data</th>
            <th>Produtos</th>
            <th>Valor Unitário</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.codigo_produto}>
              <td>{pedido.codigo_produto}</td>
              <td>{pedido.fornecedor}</td>
              <td>{pedido.data}</td>
              <td>{pedido.produto}</td>
              <td>{pedido.valorUnitario}</td>
              <td>{pedido.quantidade}</td>
              <td>{pedido.valorTotal}</td>
              <td>{pedido.status}</td>
              <td>
                <button onClick={() => updatePedido(pedido.codigo_produto)}>Atualizar</button>
                <button onClick={() => deletePedido(pedido.codigo_produto)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidoList;