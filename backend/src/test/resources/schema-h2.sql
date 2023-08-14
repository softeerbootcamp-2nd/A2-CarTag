-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-08-11 10:33:17.936

-- tables
-- Table: Car
CREATE TABLE Car (
                     car_id int  NOT NULL,
                     car_type_id int  NOT NULL,
                     trim varchar(50)  NOT NULL,
                     car_default_price int  NOT NULL,
                     outer_image varchar(255)  NOT NULL,
                     inner_image varchar(255)  NOT NULL,
                     wheel_image varchar(255)  NULL,
                     bought_count bigint  NOT NULL,
                     car_description varchar(255)  NOT NULL,
                     CONSTRAINT Car_pk PRIMARY KEY (car_id)
);

-- Table: CarOption
CREATE TABLE CarOption (
                           option_id int  NOT NULL,
                           option_category_id int  NOT NULL,
                           option_name varchar(50)  NOT NULL,
                           option_image varchar(255)  NULL,
                           option_description text  NULL,
                           option_used_count double  NULL,
                           CONSTRAINT CarOption_pk PRIMARY KEY (option_id)
);

-- Table: CarType
CREATE TABLE CarType (
                         car_type_id int  NOT NULL,
                         car_type_image varchar(255)  NOT NULL,
                         car_type_name varchar(50)  NOT NULL,
                         CONSTRAINT CarType_pk PRIMARY KEY (car_type_id)
);

-- Table: Color
CREATE TABLE Color (
                       color_id int  NOT NULL,
                       color_name varchar(50)  NOT NULL,
                       color_image varchar(255)  NOT NULL,
                       is_outer_color int  NOT NULL,
                       CONSTRAINT Color_pk PRIMARY KEY (color_id)
);

-- Table: ColorCarMapper
CREATE TABLE ColorCarMapper (
                                color_car_mapper_id int  NOT NULL,
                                car_id int  NOT NULL,
                                color_id int  NOT NULL,
                                color_car_image varchar(255)  NOT NULL,
                                color_price bigint  NOT NULL,
                                color_bought_count bigint  NOT NULL,
                                CONSTRAINT ColorCarMapper_pk PRIMARY KEY (color_car_mapper_id)
);

-- Table: DefaultOptionData
CREATE TABLE DefaultOptionData (
                                   default_option_data_id int  NOT NULL,
                                   car_id int  NOT NULL,
                                   option_id int  NOT NULL,
                                   CONSTRAINT DefaultOptionData_pk PRIMARY KEY (default_option_data_id)
);

-- Table: Hashtag
CREATE TABLE Hashtag (
                         hashtag_id int  NOT NULL,
                         hashtag_name varchar(50)  NOT NULL,
                         CONSTRAINT Hashtag_pk PRIMARY KEY (hashtag_id)
);

-- Table: Model
CREATE TABLE Model (
                       model_id int  NOT NULL,
                       model_name varchar(50)  NOT NULL,
                       model_type_id int  NOT NULL,
                       option_description text  NOT NULL,
                       model_price bigint  NOT NULL,
                       model_image varchar(255)  NOT NULL,
                       CONSTRAINT Model_pk PRIMARY KEY (model_id)
);

-- Table: ModelCarMapper
CREATE TABLE ModelCarMapper (
                                model_car_mapper_id int  NOT NULL,
                                car_id int  NOT NULL,
                                model_id int  NOT NULL,
                                model_bought_count bigint  NOT NULL,
                                is_default_model int  NOT NULL,
                                CONSTRAINT ModelCarMapper_pk PRIMARY KEY (model_car_mapper_id)
);

-- Table: ModelType
CREATE TABLE ModelType (
                           model_type_id int  NOT NULL,
                           model_type_name varchar(50)  NOT NULL,
                           CONSTRAINT ModelType_pk PRIMARY KEY (model_type_id)
);

-- Table: OptionCategory
CREATE TABLE OptionCategory (
                                option_category_id int  NOT NULL,
                                option_category_name varchar(50)  NOT NULL,
                                CONSTRAINT OptionCategory_pk PRIMARY KEY (option_category_id)
);

-- Table: OptionHashtag
CREATE TABLE OptionHashtag (
                               option_hashtag_id int  NOT NULL,
                               option_id int  NOT NULL,
                               hashtag_id int  NOT NULL,
                               CONSTRAINT OptionHashtag_pk PRIMARY KEY (option_hashtag_id)
);

-- Table: PowerTrainData
CREATE TABLE PowerTrainData (
                                power_train_id int  NOT NULL,
                                max_ps varchar(30)  NOT NULL,
                                max_kgfm varchar(50)  NOT NULL,
                                CONSTRAINT PowerTrainData_pk PRIMARY KEY (power_train_id)
);

-- Table: PowerTrainOperationEfficiency
CREATE TABLE PowerTrainOperationEfficiency (
                                               efficiency_id int  NOT NULL,
                                               power_train_id int  NOT NULL,
                                               operation_id int  NOT NULL,
                                               average_fuel varchar(50)  NOT NULL,
                                               displacement varchar(50)  NOT NULL,
                                               CONSTRAINT PowerTrainOperationEfficiency_pk PRIMARY KEY (efficiency_id)
);

-- Table: SalesHistory
CREATE TABLE SalesHistory (
                              sales_history_id int  NOT NULL,
                              car_id int  NOT NULL,
                              total_price bigint  NOT NULL,
                              sales_count bigint  NOT NULL,
                              CONSTRAINT SalesHistory_pk PRIMARY KEY (sales_history_id)
);

-- Table: SalesModel
CREATE TABLE SalesModel (
                            model_id int  NOT NULL,
                            sales_history_id int  NOT NULL,
                            CONSTRAINT SalesModel_pk PRIMARY KEY (model_id,sales_history_id)
);

-- Table: SalesOption
CREATE TABLE SalesOption (
                             sales_option_id int  NOT NULL,
                             sales_history_id int  NOT NULL,
                             sub_option_id int  NOT NULL,
                             CONSTRAINT SalesOption_pk PRIMARY KEY (sales_option_id)
);

-- Table: SubOptionData
CREATE TABLE SubOptionData (
                               sub_option_data_id int  NOT NULL,
                               car_id int  NOT NULL,
                               option_id int  NOT NULL,
                               option_bought_count bigint  NOT NULL,
                               option_price bigint  NOT NULL,
                               CONSTRAINT SubOptionData_pk PRIMARY KEY (sub_option_data_id)
);

-- Table: SubOptionPackage
CREATE TABLE SubOptionPackage (
                                  package_id int  NOT NULL,
                                  option_id int  NOT NULL,
                                  CONSTRAINT SubOptionPackage_pk PRIMARY KEY (package_id,option_id)
);

-- foreign keys
-- Reference: Car_CarType (table: Car)
ALTER TABLE Car ADD CONSTRAINT Car_CarType FOREIGN KEY (car_type_id)
    REFERENCES CarType (car_type_id);

-- Reference: ColorCarMapper_Car (table: ColorCarMapper)
ALTER TABLE ColorCarMapper ADD CONSTRAINT ColorCarMapper_Car FOREIGN KEY (car_id)
    REFERENCES Car (car_id);

-- Reference: ColorCarMapper_Color (table: ColorCarMapper)
ALTER TABLE ColorCarMapper ADD CONSTRAINT ColorCarMapper_Color FOREIGN KEY (color_id)
    REFERENCES Color (color_id);

-- Reference: DefaultOptionData_Option (table: DefaultOptionData)
ALTER TABLE DefaultOptionData ADD CONSTRAINT DefaultOptionData_Option FOREIGN KEY (option_id)
    REFERENCES CarOption (option_id);

-- Reference: MainOptionData_Car (table: DefaultOptionData)
ALTER TABLE DefaultOptionData ADD CONSTRAINT MainOptionData_Car FOREIGN KEY (car_id)
    REFERENCES Car (car_id);

-- Reference: ModelCarMapper_Car (table: ModelCarMapper)
ALTER TABLE ModelCarMapper ADD CONSTRAINT ModelCarMapper_Car FOREIGN KEY (car_id)
    REFERENCES Car (car_id);

-- Reference: ModelCarMapper_Model (table: ModelCarMapper)
ALTER TABLE ModelCarMapper ADD CONSTRAINT ModelCarMapper_Model FOREIGN KEY (model_id)
    REFERENCES Model (model_id);

-- Reference: Model_ModelType (table: Model)
ALTER TABLE Model ADD CONSTRAINT Model_ModelType FOREIGN KEY (model_type_id)
    REFERENCES ModelType (model_type_id);

-- Reference: Operation_Efficiency_Model (table: PowerTrainOperationEfficiency)
ALTER TABLE PowerTrainOperationEfficiency ADD CONSTRAINT Operation_Efficiency_Model FOREIGN KEY (operation_id)
    REFERENCES Model (model_id);

-- Reference: OptionHashtag_Hashtag (table: OptionHashtag)
ALTER TABLE OptionHashtag ADD CONSTRAINT OptionHashtag_Hashtag FOREIGN KEY (hashtag_id)
    REFERENCES Hashtag (hashtag_id);

-- Reference: OptionHashtag_SubOption (table: OptionHashtag)
ALTER TABLE OptionHashtag ADD CONSTRAINT OptionHashtag_SubOption FOREIGN KEY (option_id)
    REFERENCES CarOption (option_id);

-- Reference: Package (table: SubOptionPackage)
ALTER TABLE SubOptionPackage ADD CONSTRAINT Package FOREIGN KEY (package_id)
    REFERENCES CarOption (option_id);

-- Reference: PowerTrainData_Model (table: PowerTrainData)
ALTER TABLE PowerTrainData ADD CONSTRAINT PowerTrainData_Model FOREIGN KEY (power_train_id)
    REFERENCES Model (model_id);

-- Reference: PowerTrain_Efficiency_Model (table: PowerTrainOperationEfficiency)
ALTER TABLE PowerTrainOperationEfficiency ADD CONSTRAINT PowerTrain_Efficiency_Model FOREIGN KEY (power_train_id)
    REFERENCES Model (model_id);

-- Reference: SalesHistory_Car (table: SalesHistory)
ALTER TABLE SalesHistory ADD CONSTRAINT SalesHistory_Car FOREIGN KEY (car_id)
    REFERENCES Car (car_id);

-- Reference: SalesModel_Model (table: SalesModel)
ALTER TABLE SalesModel ADD CONSTRAINT SalesModel_Model FOREIGN KEY (model_id)
    REFERENCES Model (model_id);

-- Reference: SalesModel_SalesHistory (table: SalesModel)
ALTER TABLE SalesModel ADD CONSTRAINT SalesModel_SalesHistory FOREIGN KEY (sales_history_id)
    REFERENCES SalesHistory (sales_history_id);

-- Reference: SalesOption_SalesHistory (table: SalesOption)
ALTER TABLE SalesOption ADD CONSTRAINT SalesOption_SalesHistory FOREIGN KEY (sales_history_id)
    REFERENCES SalesHistory (sales_history_id);

-- Reference: SalesOption_SubOption (table: SalesOption)
ALTER TABLE SalesOption ADD CONSTRAINT SalesOption_SubOption FOREIGN KEY (sub_option_id)
    REFERENCES CarOption (option_id);

-- Reference: SubOptionData_Car (table: SubOptionData)
ALTER TABLE SubOptionData ADD CONSTRAINT SubOptionData_Car FOREIGN KEY (car_id)
    REFERENCES Car (car_id);

-- Reference: SubOptionData_SubOption (table: SubOptionData)
ALTER TABLE SubOptionData ADD CONSTRAINT SubOptionData_SubOption FOREIGN KEY (option_id)
    REFERENCES CarOption (option_id);

-- Reference: SubOption_OptionCategory (table: CarOption)
ALTER TABLE CarOption ADD CONSTRAINT SubOption_OptionCategory FOREIGN KEY (option_category_id)
    REFERENCES OptionCategory (option_category_id);

-- Reference: SubOption_SubOption (table: SubOptionPackage)
ALTER TABLE SubOptionPackage ADD CONSTRAINT SubOption_SubOption FOREIGN KEY (option_id)
    REFERENCES CarOption (option_id);

-- End of file.

