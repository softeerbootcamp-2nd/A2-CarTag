import pandas as pd

# CSV 파일 경로
csv_file_path = 'salesData.csv'

# CSV 파일 데이터 읽기
data = pd.read_csv(csv_file_path, dtype={'CarOptionList': str})

idx = 0

sales_data = []
mapper_data = []

# SalesHistory 테이블에 데이터 삽입
for index, row in data.iterrows():
    car_id = 1
    sold_count = int(row['count'])
    sold_options_id = str(row['CarOptionList']) if not pd.isna(row['CarOptionList']) else ''
    history_id = row['history_id']

    sales_data.append((history_id, car_id, sold_count, sold_options_id))

    power_train_id = int(row['PowerTrain'])
    body_type_id = int(row['BodyType'])
    operation_id = int(row['Operation'])

    mapper_data.append((idx, power_train_id, history_id))
    mapper_data.append((idx + 1, body_type_id, history_id))
    mapper_data.append((idx + 2, operation_id, history_id))
    idx += 3

df1 = pd.DataFrame(sales_data, columns=['history_id', 'car_id', 'sold_count', 'sold_options_id'])
df2 = pd.DataFrame(mapper_data, columns=['history_model_mapper_id', 'model_id', 'history_id'])
df1.to_csv('saleHistory.csv', sep=',', index=False)
df2.to_csv('saleModelMapper.csv', sep=',', index=False)