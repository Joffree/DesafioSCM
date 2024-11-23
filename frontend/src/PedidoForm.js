import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PedidoForm = ({ addPedido, pedidoParaEditar, atualizarPedido }) => {
  const [formData, setFormData] = useState({
    fornecedor: '',
    data: '',
    produto: '',
    codigo_produto: '',
    valorUnitario: '',
    quantidade: '',
    valorTotal: '',
    status: 'Pendente'
  });

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('/ProdutoList.json');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    if (pedidoParaEditar) {
      setFormData(pedidoParaEditar);
    }
  }, [pedidoParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'produto') {
      const selectedProduto = produtos.find(produto => produto.nome_produto === value);
      if (selectedProduto) {
        setFormData({ 
          ...formData, 
          produto: value, 
          codigo_produto: selectedProduto.codigo_produto,
          valorUnitario: selectedProduto.valorUnitario,
          valorTotal: formatCurrency(selectedProduto.valorUnitario * formData.quantidade)
        });
      }
    }

    if (name === 'quantidade') {
      setFormData({ 
        ...formData, 
        quantidade: value, 
        valorTotal: formatCurrency(formData.valorUnitario * value)
      });
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pedidoParaEditar) {
      try {
        await atualizarPedido(formData);
      } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5001/orders', formData);
        addPedido(response.data);
        setFormData({ 
          fornecedor: '', 
          data: '', 
          produto: '', 
          codigo_produto: '', 
          valorUnitario: '', 
          quantidade: '', 
          valorTotal: '', 
          status: 'Pendente' 
        });
      } catch (error) {
        console.error('Erro ao adicionar pedido:', error);
      }
    }
  };

  return (
    <form className="pedido-form" onSubmit={handleSubmit}>
      <label>
        Fornecedor:
        <select name="fornecedor" value={formData.fornecedor} onChange={handleChange}>
          <option value="">Selecione um fornecedor</option>
          <option value="DELL">DELL</option>
          <option value="HBO">HBO</option>
          <option value="Kalunga">Kalunga</option>
        </select>
      </label>
      <label>
        Data:
        <input type="date" name="data" value={formData.data} onChange={handleChange} />
      </label>
      <label>
        Produto:
        <select name="produto" value={formData.produto} onChange={handleChange}>
          <option value="">Selecione um produto</option>
          {produtos.map(produto => (
            <option key={produto.codigo_produto} value={produto.nome_produto}>
              {produto.nome_produto}
            </option>
          ))}
        </select>
      </label>
      <label>
        Código do Produto:
        <input type="text" name="codigo_produto" value={formData.codigo_produto} readOnly />
      </label>
      <label>
        Valor Unitário:
        <input type="number" name="valorUnitario" value={formData.valorUnitario} readOnly />
      </label>
      <label>
        Quantidade:
        <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} />
      </label>
      <label>
        Valor Total:
        <input type="text" name="valorTotal" value={formData.valorTotal} readOnly />
      </label>
      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
      </label>
      <button type="submit" className="submit-button">
        {pedidoParaEditar ? 'Atualizar Pedido' : 'Adicionar Pedido'}
      </button>
    </form>
  );
};

export default PedidoForm;