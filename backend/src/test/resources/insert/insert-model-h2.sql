insert into CarType values (1, '/images/cartype/palisade.jpg', '팰리세이드');
insert into Car values (1, 1, 'Le Blanc', 38650000, 'outer-image.jpg', 'inner-image.jpg', 'wheel-image.jpg', 10000, '편안합니다.');

insert into ModelType (model_type_id, model_type_name) VALUES (1, '파워트레인');
insert into ModelType (model_type_id, model_type_name) VALUES (2, '구동방식');
insert into ModelType (model_type_id, model_type_name) VALUES (3, '바디타입');

insert into Model values (1, '디젤 2.2', 1, '높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다', 1480000, '/images/models/diesel2-2.jpg');
insert into Model values (2, '가솔린 3.8', 1, '높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다', 0, '/images/models/gasoline3-8.jpg');
insert into Model values (3, '2WD', 2, '"엔진에서 전달되는 동력이 전/후륜 바퀴 중 한쪽으로만 전달되어 차량을 움직이는 방식입니다
차체가 가벼워 연료 효율이 높습니다"', 0, '/images/models/2wd.jpg');
insert into Model values (4, '4WD', 2, '"전자식 상시 4륜 구동 시스템 입니다
도로의 상황이나 주행 환경에 맞춰 전후륜 구동력을 자동배분하여 주행 안전성을 높여줍니다"', 2370000, '/images/models/4wd.jpg');
insert into Model values (5, '7인승', 3, '기존 8인승 시트(1열 2명, 2열 3명, 3열 3명)에서 2열 가운데 시트를 없애 2열 탑승객의 편의는 물론, 3열 탑승객의 승하차가 편리합니다', 0, '/images/models/7seats.jpg');
insert into Model values (6, '8인승', 3, '1열 2명, 2열 3명, 3열 3명이 탑승할 수 있는 구조로, 많은 인원이 탑승할 수 있도록 배려하였습니다', 0, '/images/models/8seats.jpg');

insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_option) VALUES (1, 1, 1, 800, 1);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_option) VALUES (2, 1, 2, 1300, 0);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_option) VALUES (3, 1, 3, 500, 1);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_option) VALUES (4, 1, 4, 1500, 0);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_option) VALUES (5, 1, 5, 2300, 1);
insert into ModelCarMapper (model_car_mapper_id, car_id, model_id, model_bought_count, is_default_option) VALUES (6, 1, 6, 1800, 0);

