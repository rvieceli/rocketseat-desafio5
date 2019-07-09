import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaArrowCircleLeft } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import Loading from '../../components/Loading';

import {
  Owner,
  IssueList,
  IssueLabel,
  Filter,
  FilterButton,
  Paginator,
} from './styles';

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
    filter: 'open',
    page: 1,
  };

  async componentDidMount() {
    const { filter } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  refreshIssues = async () => {
    const { filter, page } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
    });
  };

  handleChange = async filter => {
    await this.setState({ filter, page: 1 });

    this.refreshIssues();
  };

  handlePage = async n => {
    const { page } = this.state;
    await this.setState({ page: page + n });

    this.refreshIssues();
  };

  render() {
    const { repository, issues, loading, filter, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowCircleLeft />
            Repositórios
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <Filter>
            <FilterButton
              selected={filter === 'open'}
              onClick={() => this.handleChange('open')}
            >
              Open
            </FilterButton>
            <FilterButton
              selected={filter === 'closed'}
              onClick={() => this.handleChange('closed')}
            >
              Closed
            </FilterButton>
            <FilterButton
              selected={filter === 'all'}
              onClick={() => this.handleChange('all')}
            >
              All
            </FilterButton>
          </Filter>

          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <IssueLabel key={String(label.id)} labelColor={label.color}>
                      {label.name}
                    </IssueLabel>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Paginator>
          <button type="button" onClick={() => this.handlePage(-1)}>
            Back
          </button>
          <span>{page}</span>
          <button type="button" onClick={() => this.handlePage(1)}>
            Next
          </button>
        </Paginator>
      </Container>
    );
  }
}
