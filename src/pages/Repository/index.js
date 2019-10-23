import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import Button from '../../components/Button';
import { Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'open',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { state } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 4,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async s => {
    this.setState({ state: s });
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { data } = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: s,
        per_page: 4,
      },
    });

    this.setState({ issues: data, page: 1 });
  };

  handleNextPage = async pg => {
    const { match } = this.props;
    const { state } = this.state;

    const next = pg + 1;

    const repoName = decodeURIComponent(match.params.repository);

    const { data } = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        page: next,
        per_page: 4,
      },
    });

    this.setState({ page: next, issues: data });
  };

  handlePrevPage = async pg => {
    const { match } = this.props;
    const { state } = this.state;

    const prev = pg - 1;

    const repoName = decodeURIComponent(match.params.repository);

    const { data } = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        page: prev,
        per_page: 4,
      },
    });

    this.setState({ page: prev, issues: data });
  };

  render() {
    const { repository, issues, loading, state, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <div id="filter">
            <Button
              onClick={() => this.handleFilter('all')}
              type="button"
              disabled={state === 'all' ? 'disabled' : ''}
            >
              Todos
            </Button>
            <Button
              onClick={() => this.handleFilter('open')}
              type="button"
              disabled={state === 'open' ? 'disabled' : ''}
            >
              Aberto
            </Button>
            <Button
              onClick={() => this.handleFilter('closed')}
              type="button"
              disabled={state === 'closed' ? 'disabled' : ''}
            >
              Fechado
            </Button>
          </div>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}

          <div id="page">
            <Button
              disabled={page === 1 ? 'disabled' : ''}
              onClick={() => this.handlePrevPage(page)}
              type="button"
            >
              Anterior
            </Button>
            <Button onClick={() => this.handleNextPage(page)} type="button">
              Próximo
            </Button>
          </div>
        </IssueList>
      </Container>
    );
  }
}
