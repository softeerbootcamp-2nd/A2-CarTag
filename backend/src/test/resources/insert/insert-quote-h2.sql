insert into CarType (car_type_id, car_type_image, car_type_name) values (1, '/cartype/palisade/palisade-thumbnail.png',	'팰리세이드');
insert into Car values (1, 1, '르블랑', 41980000, '/cartype/palisade/leblanc-outer.png', '/cartype/palisade/palisade-inner.png', '/cartype/palisade/leblanc-wheel.png', 150000, '합리적인 조합의 절정');

insert into ModelType (model_type_id, model_type_name) VALUES (1, '파워트레인');
insert into ModelType (model_type_id, model_type_name) VALUES (2, '구동방식');
insert into ModelType (model_type_id, model_type_name) VALUES (3, '바디타입');

INSERT INTO Model VALUES (1,'디젤2.2',1,'높은 토크로 파워풀한 드라이빙이 가능하며, 차급대비 연비 효율이 우수합니다',1480000,'/model/diesel2-2.jpg');
INSERT INTO Model VALUES (2,'가솔린3.8',1,'고마력의 우수한 가속 성능을 확보하여, 넉넉하고 안정감 있는 주행이 가능합니다.' || CHR(10) || '엔진의 진동이 적어 편안하고 조용한 드라이빙 감성을 제공합니다.',0,'/model/gasoline3-8.jpg');
INSERT INTO Model VALUES (3,'2WD',2,'엔진에서 전달되는 동력이 전/후륜 바퀴 중 한쪽으로만 전달되어 차량을 움직이는 방식입니다.' || CHR(10) || '차체가 가벼워 연료 효율이 높습니다.',0,'/model/2wd.png');
INSERT INTO Model VALUES (4,'4WD',2,'전자식 상시 4륜 구동 시스템 입니다.' || CHR(10) || '도로의 상황이나 주행 환경에 맞춰 전후륜 구동력을 자동배분하여 주행 안전성을 높여줍니다',2370000,'/model/4wd.png');
INSERT INTO Model VALUES (5,'7인승',3,'기존 8인승 시트(1열 2명, 2열 3명, 3열 3명)에서 2열 가운데 시트를 없애 2열 탑승객의 편의는 물론, 3열 탑승객의 승하차가 편리합니다',0,'/model/7seats.jpg');
INSERT INTO Model VALUES (6,'8인승',3,'1열 2명, 2열 3명, 3열 3명이 탑승할 수 있는 구조로, 많은 인원이 탑승할 수 있도록 배려하였습니다',0,'/model/8seats.jpg');

insert into Color values(1, '천연 퀄팅(블랙)', 'image_1', 1);
insert into Color values(2, '천연 퀄팅(화이트)', 'image_2', 1);
insert into Color values(3, '퍼플 그레이 펄', 'image_3', 0);
insert into Color values(4, '코발트 블루', 'image_4', 0);

insert into ColorCarMapper values(1, 1, 1, 'red_image_*.jpg', 1234, 12348);
insert into ColorCarMapper values(2, 1, 2, 'white_image_*.jpg', 555, 12346);
insert into ColorCarMapper values(3, 1, 3, 'black_image_*.jpg', 154, 12354);
insert into ColorCarMapper values(4, 1, 4, 'blue_image_*.jpg', 1734, 1234);

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