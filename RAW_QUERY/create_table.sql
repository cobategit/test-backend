create table employee (
id serial primary key,
nik varchar(200) null,
name varchar(200) null,
is_active boolean,
start_date date not null,
end_date date not null,
created_by varchar(100) null,
updated_by varchar(100) null,
created_at timestamp not null,
updated_at timestamp not null
);
CREATE INDEX filter_employee ON employee (nik, name);

CREATE TYPE LEVEL_EDUCATION AS ENUM ('TK', 'SD', 'SMP', 'SMA', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor');
create table employee_education (
id serial primary key,
employee_id int references employee(id),
name varchar(100) null,
level LEVEL_EDUCATION,
description varchar(255),
created_by varchar(100) null,
updated_by varchar(100) null,
created_at timestamp not null,
updated_at timestamp not null
);
CREATE INDEX filter_employee_education ON employee_education (name);

CREATE TYPE RELIGION_FAMILY AS ENUM ('Islam', 'Kristen', 'Budha', 'Protestan', 'Konghucu 1');
CREATE TYPE RELATION_FAMILY AS ENUM ('Suami', 'Anak', 'Anak Sambung', 'Istri');
create table employee_family(
id serial primary key,
employee_id int references employee(id),
name varchar(200) null,
identifier varchar(200) null,
job varchar(200) null,
place_of_birth varchar(200) null,
date_of_birth date null,
religion RELIGION_FAMILY,
is_life boolean,
is_divorced boolean,
relation_status RELATION_FAMILY,
created_by varchar(100) null,
updated_by varchar(100) null,
created_at timestamp not null,
updated_at timestamp not null
);
CREATE INDEX filter_employee_family ON employee_family (name, identifier, job);

CREATE TYPE GENDER_PROFILE AS ENUM ('Laki-Laki', 'Perempuan');
create table employee_profile(
id serial primary key,
employee_id int references employee(id),
place_of_birth varchar(200) null,
gender GENDER_PROFILE,
date_of_birth date null,
is_married boolean,
prof_pict varchar(200),
created_by varchar(100) null,
updated_by varchar(100) null,
created_at timestamp not null,
updated_at timestamp not null
);
