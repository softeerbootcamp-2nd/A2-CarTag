import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, fpgrowth
from mlxtend.frequent_patterns import association_rules
import pymysql
import time
import os
from dotenv import load_dotenv

load_dotenv(verbose=True)

conn = pymysql.connect(host=os.getenv('host'), user=os.getenv('user'), password=os.getenv('password'), db=os.getenv('db'))
cur = conn.cursor()

def recByApriori(body):
    start = time.time()
    carId = int(body['carId'])
    powerTrainId = int(body['powerTrain'])
    bodyTypeId = int(body['bodyType'])
    operationId = int(body['operation'])

    input = []

    optionList = body['options']

    for i in range(len(optionList)):
        input.append(optionList[i]['subOptionId'])

    input = set(input)
    dataset = []
    cur.execute('SELECT hm.history_id, sh.sold_count, sh.sold_options_id FROM SalesHistory sh INNER JOIN HistoryModelMapper hm ON sh.history_id = hm.history_id WHERE sh.car_id = %s AND hm.model_id IN (%s, %s, %s) GROUP BY hm.history_id HAVING COUNT(DISTINCT hm.model_id) = 3;', (carId, powerTrainId, bodyTypeId, operationId))
    dbRow = cur.fetchall()
    for j in range(len(dbRow)):
        oneRow = dbRow[j][2]
        if(oneRow == ''):
            continue
        options = oneRow.split(",")
        for i in range(int(dbRow[j][1])):
            dataset.append(options)

    start = time.time()
    te = TransactionEncoder()
    te_ary = te.fit(dataset).transform(dataset)
    df = pd.DataFrame(te_ary, columns=te.columns_)
    frequent_itemsets = fpgrowth(df, min_support=0.05, use_colnames=True)

    result_itemsets = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.05) 
    matching_itemsets = {}

    consequent_results = set()

    for idx, row in result_itemsets.iterrows():
        confidence = row.confidence

        if set(row.antecedents).issubset(input) and len(row.consequents) <= 2 and not set(row.antecedents).union(set(row.consequents)).issubset(input):
            key = tuple(row.consequents)
            if key not in matching_itemsets or confidence > matching_itemsets[key]:
                matching_itemsets[key] = confidence

    sorted_items = sorted(matching_itemsets.items(), key=lambda x: x[1], reverse=True)
    top_items = sorted_items[:4]
    top_consequents = [consequent for consequent, _ in top_items]
    return top_consequents