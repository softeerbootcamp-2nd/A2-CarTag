insert into CarType values (1, '/images/cartype/palisade.jpg', '팰리세이드');
insert into Car values (1, 1, 'Le Blanc', 38650000, 'outer-image.jpg', 'inner-image.jpg', 'wheel-image.jpg', 10000, '편안합니다.');

insert into OptionCategory (option_category_id, option_category_name) VALUES (1, '상세품목');
insert into OptionCategory (option_category_id, option_category_name) VALUES (2, '악세사리');
insert into OptionCategory (option_category_id, option_category_name) VALUES (3, '휠');

insert into suboption values (1, 1, '2열 통풍 시트', '/images/options/sub/2seats.jpg', '시동이 걸린 상태에서 해당 좌석의 통풍 스위치를 누르면 표시등이 켜지면서 해당 좌석에 바람이 나오는 편의장치입니다.', 0);
insert into suboption values (2, 2, '적외선 무릎 워머', '/images/options/sub/warmer.jpg', '워머입니다.', 0);
insert into suboption values (3, 2, '듀얼 머플러 패키지', '/images/options/sub/murfler.jpg', '머플러입니다.', 0);
insert into suboption values (4, 3, '20인치 다크 스퍼터링 휠', '/images/options/sub/darkwheel.jpg', '다크 휠입니다.', 1);

insert into SubOptionData values (1, 1, 1, 2800, 38, 100000);
insert into SubOptionData values (2, 1, 2, 4200, 42, 130000);
insert into SubOptionData values (3, 1, 3, 1300, 55, 870000);
insert into SubOptionData values (4, 1, 4, 3850, 12, 50000);

insert into Hashtag values (1, '레저');
insert into Hashtag values (2, '스포츠');
insert into Hashtag values (3, '캠핑');
insert into Hashtag values (4, '장거리 운전');
insert into Hashtag values (5, '주차');

insert into OptionHashtag (option_hashtag_id, sub_option_id, hashtag_id) values (1, 1, 1);
insert into OptionHashtag (option_hashtag_id, sub_option_id, hashtag_id) values (2, 1, 2);
insert into OptionHashtag (option_hashtag_id, sub_option_id, hashtag_id) values (3, 1, 3);
insert into OptionHashtag (option_hashtag_id, sub_option_id, hashtag_id) values (4, 2, 1);
insert into OptionHashtag (option_hashtag_id, sub_option_id, hashtag_id) values (5, 2, 4);
insert into OptionHashtag (option_hashtag_id, sub_option_id, hashtag_id) values (6, 2, 5);



