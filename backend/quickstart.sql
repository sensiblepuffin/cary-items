create table if not exists items(id serial primary key, name varchar(32) not null);

insert into items (id, name) VALUES (DEFAULT, 'apples'), (DEFAULT, 'bananas'), (DEFAULT, 'grapes');
