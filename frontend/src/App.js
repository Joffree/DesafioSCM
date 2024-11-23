import React, { useState, useEffect } from 'react';
import PedidoForm from './PedidoForm';
import PedidoList from './PedidoList';
import axios from 'axios';
import './index.css';

const App = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filter, setFilter] = useState('');
  const [view, setView] = useState('solicitar');
  const [pedidoParaEditar, setPedidoParaEditar] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/orders');
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const addPedido = (pedido) => {
    setPedidos([...pedidos, pedido]);
  };

  const atualizarPedido = async (pedidoAtualizado) => {
    try {
      const response = await axios.put(`http://localhost:5001/orders/${pedidoAtualizado.codigo_produto}`, pedidoAtualizado);
      setPedidos(pedidos.map(pedido => (pedido.codigo_produto === pedidoAtualizado.codigo_produto ? response.data : pedido)));
      setPedidoParaEditar(null);
      setView('consultar');
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  const deletePedido = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/orders/${id}`);
      setPedidos(pedidos.filter(pedido => pedido.codigo_produto !== id));
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  const editarPedido = (id) => {
    const pedido = pedidos.find(pedido => pedido.codigo_produto === id);
    setPedidoParaEditar(pedido);
    setView('solicitar');
  };

  const filteredPedidos = filter ? pedidos.filter(pedido => pedido.status === filter) : pedidos;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gerenciador de Pedidos</h1>
        <div className="view-buttons">
          <button className="view-button" onClick={() => setView('solicitar')}>Solicitar Produto</button>
          <button className="view-button" onClick={() => setView('consultar')}>Consultar Solicitação</button>
        </div>
      </header>
      <main>
        {view === 'solicitar' && (
          <PedidoForm 
            addPedido={addPedido} 
            pedidoParaEditar={pedidoParaEditar} 
            atualizarPedido={atualizarPedido} 
          />
        )}
        {view === 'consultar' && (
          <>
            <div className="filter-container">
              <label htmlFor="filter">Filtrar por Status:</label>
              <select id="filter" onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="">Todos</option>
                <option value="Pendente">Pendente</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
            <PedidoList 
              pedidos={filteredPedidos} 
              updatePedido={editarPedido} 
              deletePedido={deletePedido} 
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;