import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: false });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
        description: response.data.description,
        avatar: response.data.owner.avatar_url,
      };

      try {
        repositories.forEach(repository => {
          if (repository.name === data.name) {
            throw new Error('Repositório duplicado');
          }
        });

        this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
        });

        toast.success('Repositório adicionado!');
      } catch (err) {
        toast.error(`${err.message}`);
        this.setState({ loading: false, error: true });
      }
    } catch (err) {
      toast.error('O repositório não foi encontrado.');
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <>
        <ToastContainer />

        <Container>
          <h1>
            <FaGithubAlt />
            Repositórios
          </h1>

          <Form onSubmit={this.handleSubmit} error={error}>
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                <FaPlus color="#FFF" size={14} />
              )}
            </SubmitButton>
          </Form>

          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span className="repository-container">
                  <img src={repository.avatar} alt={repository.name} />
                  <span className="resository-description">
                    <strong>{repository.name}</strong>
                    <span>{repository.description}</span>
                  </span>
                </span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </li>
            ))}
          </List>
        </Container>
      </>
    );
  }
}
