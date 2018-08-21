import Immutable from "immutable";

const RepositoryRecord = Immutable.Record({
  id: 0,
  full_name: "",
  stargazers_count: 0
});

export default class Repository extends RepositoryRecord {
  is(repository) {
    return this.id === repository.id;
  }
}
