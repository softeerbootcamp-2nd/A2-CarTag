insert into CarType values (1, '/images/cartype/palisade.jpg', '팰리세이드');
insert into Car values (1, 1, 'Le Blanc', 38650000, 'outer-image.jpg', 'inner-image.jpg', 'wheel-image.jpg', 10000, '편안합니다.');

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

