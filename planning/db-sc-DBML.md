# [READ MORE on DBML](http://www.dbml-lang.org/)


```DBML
Table projects as p {
  project_id int [pk]
  name varchar [not null]
  description varchar
  completed bool [default: 0]
}

Table resources as r {
  resource_id int [pk]
  name varchar [
    not null,
    unique]
  description varchar
}

Table tasks as t {
  task_id int [pk]
  description varchar [not null]
  note varchar
  completed bool [default: 0]
  project_id int [
    not null,
    ref: > p.project_id,
    note: "
      [foreign key]
      ref = many-to-one"]
}

Table project_resource as pr{
  id int [pk]
  project_id int [
    not null,
    ref: > p.project_id]
  resource_id int [
    not null,
    ref: > r.resource_id]
}
```