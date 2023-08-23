insert into CarType (car_type_id, car_type_image, car_type_name) values (1, '/cartype/palisade/palisade-thumbnail.png',	'팰리세이드');
insert into Car values (1, 1, '르블랑', 40000000, '/cartype/palisade/leblanc-outer.png', '/cartype/palisade/palisade-inner.png', '/cartype/palisade/leblanc-wheel.png', 2000, '합리적인 조합의 절정');

insert into ModelType (model_type_id, model_type_name) VALUES (1, '파워트레인');
insert into ModelType (model_type_id, model_type_name) VALUES (2, '구동방식');
insert into ModelType (model_type_id, model_type_name) VALUES (3, '바디타입');

INSERT INTO Model VALUES (1,'디젤2.2',1,'높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다',1480000,'/model/diesel2-2.jpg');
INSERT INTO Model VALUES (2,'가솔린3.8',1,'고마력의 우수한 가속 성능을 확보하여, 넉넉하고 안정감 있는 주행이 가능합니다.' || CHR(10) || '엔진의 진동이 적어 편안하고 조용한 드라이빙 감성을 제공합니다.',0,'/model/gasoline3-8.jpg');
INSERT INTO Model VALUES (3,'2WD',2,'엔진에서 전달되는 동력이 전/후륜 바퀴 중 한쪽으로만 전달되어 차량을 움직이는 방식입니다.' || CHR(10) || '차체가 가벼워 연료 효율이 높습니다.',0,'/model/2wd.png');
INSERT INTO Model VALUES (4,'4WD',2,'전자식 상시 4륜 구동 시스템 입니다.' || CHR(10) || '도로의 상황이나 주행 환경에 맞춰 전후륜 구동력을 자동배분하여 주행 안전성을 높여줍니다',2370000,'/model/4wd.png');
INSERT INTO Model VALUES (5,'7인승',3,'기존 8인승 시트(1열 2명, 2열 3명, 3열 3명)에서 2열 가운데 시트를 없애 2열 탑승객의 편의는 물론, 3열 탑승객의 승하차가 편리합니다',0,'/model/7seats.jpg');
INSERT INTO Model VALUES (6,'8인승',3,'1열 2명, 2열 3명, 3열 3명이 탑승할 수 있는 구조로, 많은 인원이 탑승할 수 있도록 배려하였습니다',0,'/model/8seats.jpg');

insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_model) VALUES (1, 1, 1, 800, 1);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_model) VALUES (2, 1, 2, 1200, 0);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_model) VALUES (3, 1, 3, 500, 1);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_model) VALUES (4, 1, 4, 1500, 0);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_model) VALUES (5, 1, 5, 1000, 1);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_model) VALUES (6, 1, 6, 1000, 0);

insert into PowerTrainData values (1, '202/3800', '45.0/1750~2750');
insert into PowerTrainData values (2, '295/6000', '36.2/5200');

insert into PowerTrainOperationEfficiency values (1, 1, 3, '12.16km/s', '2,199cc');
insert into PowerTrainOperationEfficiency values (2, 1, 4, '11.53km/s', '2,199cc');
insert into PowerTrainOperationEfficiency values (3, 2, 3, '9.23km/s', '3,778cc');
insert into PowerTrainOperationEfficiency values (4, 2, 4, '8.7km/s', '3,778cc');