import random
import numpy as np
import pandas as pd
from itertools import combinations

newData = []

mean = 600
std_dev = 10

meanV1 = 80
meanV2 = 150
meanV3 = 400

dict = {}
dict[0] = [1,3,5]
dict[1] = [1,3,6]
dict[2] = [1,4,5]
dict[3] = [1,4,6]
dict[4] = [2,3,5]
dict[5] = [2,3,6]
dict[6] = [2,4,5]
dict[7] = [2,4,6]

numbers = list(range(1, 16))  # 1부터 15까지의 숫자 리스트
for selected_count in range(14):   # 뽑을 숫자의 개수 # 특정 숫자
  for comb in combinations(numbers, selected_count):
      if 13 in comb and 14 in comb:
          continue
      if 13 in comb and 15 in comb:
        continue
      if 14 in comb and 15 in comb:
        continue
      subLists = list(comb)
      string_S = ""
      for i in range(len(subLists)):
        sub = str(subLists[i])
        string_S += sub
        if(i == len(subLists) - 1):
          break
        string_S +=  ","
      for i in range(8):
        all_combinations = []
        subsub = dict[i]
        all_combinations.append(subsub[0])
        all_combinations.append(subsub[1])
        all_combinations.append(subsub[2])
        all_combinations.append(string_S)
        if len(subLists) == 0 or len(subLists) == 1 or len(subLists) == 12 or len(subLists) == 13:
          all_combinations.append(int(np.random.normal(meanV1, std_dev)))
        elif len(subLists) == 2 or len(subLists) == 3 or len(subLists) == 10 or len(subLists) == 11:
          all_combinations.append(int(np.random.normal(meanV2, std_dev)))
        elif len(subLists) == 4 or len(subLists) == 5 or len(subLists) == 8 or len(subLists) == 9:
          all_combinations.append(int(np.random.normal(meanV3, std_dev)))
        else:
          all_combinations.append(int(np.random.normal(mean, std_dev)))
        newData.append(all_combinations)

df = pd.DataFrame(newData, columns=['PowerTrain', 'BodyType', 'Operation', 'CarOptionList', 'count'])
df.index = df.index + 1
df.to_csv('salesData.csv', index=True, sep=',', index_label='history_id')