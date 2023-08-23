INSERT INTO CarType (car_type_id, car_type_image, car_type_name) VALUES (1, 'image_1', '펠리세이드');
INSERT INTO CarType (car_type_id, car_type_image, car_type_name) VALUES (2, '/cartype/santafe.png', '싼타페');
INSERT INTO CarType (car_type_id, car_type_image, car_type_name) VALUES (3, '/cartype/the-all-new-kona-hybrid.png', '디 올 뉴 코나 Hybrid');

INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (1, 1, 'Le Blanc', 40000000, 'image_1', 'image_2', 'image_3', 234, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (2, 1, 'Exclusive', 40000000, 'image_1', 'image_2', 'image_3', 24, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (3, 1, 'Prestige', 40000000, 'image_1', 'image_2', 'image_3', 34, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (4, 1, 'Calligraphy', 40000000, 'image_1', 'image_2', 'image_3', 23499, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (5, 2, 'Exclusive', 35460000, '/cartype/santafe.png', '/cartype/santafe.png', '', 150000, '산타페');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (6, 3, 'Inspiration', 36380000, '/cartype/the-all-new-kona-hybrid.png', '/cartype/the-all-new-kona-hybrid.png', '', 150000, '디 올 뉴 코나 Hybrid입니다.');

insert into OptionCategory (option_category_id, option_category_name) VALUES (1, '상세품목');
insert into OptionCategory (option_category_id, option_category_name) VALUES (2, '악세사리');
insert into OptionCategory (option_category_id, option_category_name) VALUES (3, '휠');
insert into OptionCategory (option_category_id, option_category_name) VALUES (4, '외관');
insert into OptionCategory (option_category_id, option_category_name) values (9, '상세품목');

insert into caroption values (1, 1, '2열 통풍 시트', '/images/options/sub/2seats.jpg', '시동이 걸린 상태에서 해당 좌석의 통풍 스위치를 누르면 표시등이 켜지면서 해당 좌석에 바람이 나오는 편의장치입니다.', 38);
insert into caroption values (2, 2, '적외선 무릎 워머', '/images/options/sub/warmer.jpg', '워머입니다.', 42);
insert into caroption values (3, 2, '듀얼 머플러 패키지', '/images/options/sub/murfler.jpg', '머플러입니다.', 55);
insert into caroption values (4, 3, '20인치 다크 스퍼터링 휠', '/images/options/sub/darkwheel.jpg', '다크 휠입니다.', 12);
insert into CarOption (option_id, option_category_id, option_name, option_image, option_description) values (72, 9, '빌트인 캠', '/options/builtincam.png', '빌트인 적용된 영상기록장치로, 내비게이션 화면을 통해 영상 확인 및 앱 연동을 통해 영상 확인 및 SNS 공유가 가능합니다.');
insert into CarOption values (75, 2, '후석 승객알림', '/options/rear-passenger.png', '초음파 센서를 통해 뒷좌석에 남아있는 승객의 움직임을 감지하여 운전자에게 경고함으로써 부주의에 의한 유아 또는 반려 동물 등의 방치 사고를 예방하는 신기술입니다.', 82);
insert into CarOption (option_id, option_category_id, option_name, option_image, option_description) values (76, 4, '메탈 리어범퍼스텝', '/options/metalrearbumper.png', '러기지 룸 앞쪽 하단부를 메탈로 만들어 물건을 싣고 내릴 때나 사람이 올라갈 때 차체를 보호해줍니다.');
insert into CarOption(option_id, option_category_id, option_name, option_image) values (69, 9, '컴포트2', '/options/rear-passenger.png');

insert into SubOptionData values (1, 1, 1, 2800, 100000);
insert into SubOptionData values (2, 1, 2, 4200, 130000);
insert into SubOptionData values (3, 1, 3, 1300, 870000);
insert into SubOptionData values (4, 1, 4, 3850, 50000);
insert into SubOptionData values (5, 1, 72, 133980, 690000);
insert into SubOptionData values (6, 1, 69, 48015, 1090000);

insert into Hashtag values (1, '레저');
insert into Hashtag values (2, '스포츠');
insert into Hashtag values (3, '캠핑');
insert into Hashtag values (4, '장거리 운전');
insert into Hashtag values (5, '주차');

insert into OptionHashtag (option_hashtag_id, option_id, hashtag_id) values (1, 1, 1);
insert into OptionHashtag (option_hashtag_id, option_id, hashtag_id) values (2, 1, 2);
insert into OptionHashtag (option_hashtag_id, option_id, hashtag_id) values (3, 1, 3);
insert into OptionHashtag (option_hashtag_id, option_id, hashtag_id) values (4, 2, 1);
insert into OptionHashtag (option_hashtag_id, option_id, hashtag_id) values (5, 2, 4);
insert into OptionHashtag (option_hashtag_id, option_id, hashtag_id) values (6, 2, 5);

insert into defaultOptionData values(1, 1, 1);
insert into defaultOptionData values(2, 1, 2);
insert into defaultOptionData values(3, 1, 3);

insert into SubOptionPackage values (69, 75);
insert into SubOptionPackage values (69, 76);

insert into ModelType (model_type_id, model_type_name) VALUES (1, '파워트레인');
insert into ModelType (model_type_id, model_type_name) VALUES (2, '구동방식');
insert into ModelType (model_type_id, model_type_name) VALUES (3, '바디타입');

INSERT INTO Model VALUES (1,'디젤2.2',1,'높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다',1480000,'/model/diesel2-2.jpg');
INSERT INTO Model VALUES (2,'가솔린3.8',1,'고마력의 우수한 가속 성능을 확보하여, 넉넉하고 안정감 있는 주행이 가능합니다.' || CHR(10) || '엔진의 진동이 적어 편안하고 조용한 드라이빙 감성을 제공합니다.',0,'/model/gasoline3-8.jpg');
INSERT INTO Model VALUES (3,'2WD',2,'엔진에서 전달되는 동력이 전/후륜 바퀴 중 한쪽으로만 전달되어 차량을 움직이는 방식입니다.' || CHR(10) || '차체가 가벼워 연료 효율이 높습니다.',0,'/model/2wd.png');
INSERT INTO Model VALUES (4,'4WD',2,'전자식 상시 4륜 구동 시스템 입니다.' || CHR(10) || '도로의 상황이나 주행 환경에 맞춰 전후륜 구동력을 자동배분하여 주행 안전성을 높여줍니다',2370000,'/model/4wd.png');
INSERT INTO Model VALUES (5,'7인승',3,'기존 8인승 시트(1열 2명, 2열 3명, 3열 3명)에서 2열 가운데 시트를 없애 2열 탑승객의 편의는 물론, 3열 탑승객의 승하차가 편리합니다',0,'/model/7seats.jpg');
INSERT INTO Model VALUES (6,'8인승',3,'1열 2명, 2열 3명, 3열 3명이 탑승할 수 있는 구조로, 많은 인원이 탑승할 수 있도록 배려하였습니다',0,'/model/8seats.jpg');

INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (1, 1, 91, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (2, 1, 71, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (3, 1, 84, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (4, 1, 96, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (5, 1, 81, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (6, 1, 69, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (7, 1, 67, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (8, 1, 87, '');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (9, 1, 82, '69');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (10, 1, 99, '69');
INSERT INTO SalesHistory (history_id, car_id, sold_count, sold_options_id) VALUES (11, 1, 77, '69');


INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (0, 1, 1);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (1, 3, 1);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (2, 5, 1);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (3, 1, 2);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (4, 3, 2);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (5, 6, 2);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (6, 1, 3);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (7, 4, 3);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (8, 5, 3);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (10, 4, 4);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (9, 1, 4);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (11, 6, 4);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (12, 2, 5);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (13, 3, 5);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (14, 5, 5);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (15, 2, 6);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (16, 3, 6);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (17, 6, 6);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (18, 2, 7);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (19, 4, 7);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (20, 5, 7);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (21, 2, 8);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (22, 4, 8);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (23, 6, 8);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (24, 1, 9);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (25, 3, 9);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (26, 5, 9);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (27, 1, 10);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (28, 3, 10);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (29, 6, 10);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (30, 1, 11);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (31, 4, 11);
INSERT INTO HistoryModelMapper (history_model_mapper_id, model_id, history_id) VALUES (32, 5, 11);