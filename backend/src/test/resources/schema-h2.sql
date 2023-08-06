create table modeltype(
                          model_type_id int primary key,
                          model_type_name varchar(255)
);

create table car(
                    car_id int primary key,
                    bought_count bigint
);

create table model(
                      model_id int primary key,
                      model_name varchar(255),
                      model_type_id int,
                      model_price bigint
);

create table modelcarmapper(
                               model_car_mapper_id int primary key,
                               car_id int,
                               model_id int,
                               model_bought_count bigint,
                               default_option int
)