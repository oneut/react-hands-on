import React from "react";
import Axios from "axios";
import { empty, of, Subject, throwError } from "rxjs";
import {
  catchError,
  delay,
  mergeMap,
  retryWhen,
  switchMap,
  tap,
  take,
  concat
} from "rxjs/operators";
import RepositoriesAction from "../actions/RepositoriesAction";
import RepositoryComponent from "./RepositoryComponent";

export default class RepositoriesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.keywordRef = React.createRef();

    this.defaultKeyword = "tetris";

    this.stream = new Subject();
    this.stream
      .pipe(
        switchMap((keyword) => {
          return of(keyword).pipe(
            switchMap((value) => {
              return Axios.get(
                `https://api.github.com/search/repositories?q=${keyword}`
              );
            }),
            retryWhen((errors) => {
              console.log(errors);
              return errors.pipe(
                mergeMap((error) => {
                  if (error.response.status === 422) {
                    return throwError(new Error("Empty is no retry!"));
                  }

                  return of(error);
                }),
                delay(200),
                take(3),
                concat(throwError(new Error("Retry limit exceeded!")))
              );
            }),
            catchError((error) => {
              console.warn(error.message);
              return empty();
            })
          );
        })
      )
      .subscribe((result) => {
        // result.data.items
        // id
        // full_name
        // stargazers_count
        RepositoriesAction.sync(result.data.items);
      });
  }

  componentWillMount() {
    this.stream.next(this.defaultKeyword);
  }

  componentWillReceiveProps(nextProps) {}

  handleChangeKeyword() {
    this.stream.next(this.keywordRef.current.value);
  }

  render() {
    const repositoryComponents = this.getRepositoryComponents();

    return (
      <div>
        <h1>Repositories</h1>
        <div>
          serach:
          <input
            ref={this.keywordRef}
            type="text"
            defaultValue={this.defaultKeyword}
            onChange={this.handleChangeKeyword.bind(this)}
          />
        </div>
        <ul>{repositoryComponents}</ul>
      </div>
    );
  }

  getRepositoryComponents() {
    if (this.props.repositories.isEmpty()) {
      return <li>Nothing.</li>;
    }

    return this.props.repositories
      .filter((repository) => {
        return !this.props.selectedRepositories.find((selectedRepository) => {
          return repository.is(selectedRepository);
        });
      })
      .map((repository, index) => {
        return <RepositoryComponent key={index} repository={repository} />;
      });
  }
}
