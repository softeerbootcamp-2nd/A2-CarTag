INSERT INTO CarType (car_type_id, car_type_image, car_type_name) VALUES (1, 'image_1', '펠리세이드');
INSERT INTO CarType (car_type_id, car_type_image, car_type_name) VALUES (2, '/cartype/santafe.png', '싼타페');
INSERT INTO CarType (car_type_id, car_type_image, car_type_name) VALUES (3, '/cartype/the-all-new-kona-hybrid.png', '디 올 뉴 코나 Hybrid');

INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (1, 1, 'Le Blanc', 40000000, 'image_1', 'image_2', 'image_3', 234, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (2, 1, 'Exclusive', 40000000, 'image_1', 'image_2', 'image_3', 24, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (3, 1, 'Prestige', 40000000, 'image_1', 'image_2', 'image_3', 34, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (4, 1, 'Calligraphy', 40000000, 'image_1', 'image_2', 'image_3', 23499, 'Good');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (5, 2, 'Exclusive', 35460000, '/cartype/santafe.png', '/cartype/santafe.png', '', 150000, '산타페');
INSERT INTO Car (car_id, car_type_id, trim, car_default_price, outer_image, inner_image, wheel_image, bought_count, car_description) VALUES (6, 3, 'Inspiration', 36380000, '/cartype/the-all-new-kona-hybrid.png', '/cartype/the-all-new-kona-hybrid.png', '', 150000, '디 올 뉴 코나 Hybrid입니다.');
