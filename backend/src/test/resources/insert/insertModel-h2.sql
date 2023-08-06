insert into modeltype(model_type_id, model_type_name) values (1, '파워트레인');
insert into modeltype(model_type_id, model_type_name) values (2, '바디 타입');

insert into car(car_id, bought_count) values (1, 2000);

insert into model(model_id, model_name, model_type_id, model_price) values (1, '디젤 2.2', 1, 0);
insert into model(model_id, model_name, model_type_id, model_price) values (2, '가솔린 3.8', 1, 130000);
insert into model(model_id, model_name, model_type_id, model_price) values (3, '7인승', 2, 0);
insert into Model(model_id, model_name, model_type_id, model_price) values (4, '8인승', 2, 150000);

insert into modelcarmapper(model_car_mapper_id, car_id, model_id, model_bought_count, default_option) values (1, 1, 1, 800, true);
insert into modelcarmapper(model_car_mapper_id, car_id, model_id, model_bought_count, default_option) values (2, 1, 2, 1200, false);
insert into modelcarmapper(model_car_mapper_id, car_id, model_id, model_bought_count, default_option) values (3, 1, 3, 600, true);
insert into modelcarmapper(model_car_mapper_id, car_id, model_id, model_bought_count, default_option) values (4, 1, 4, 1500, false);