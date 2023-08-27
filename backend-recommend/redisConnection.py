import io
import redis
import pandas as pd
import os

redis_pool = redis.ConnectionPool(host='3.37.253.113', port=6379, password=1234, db=0)

def redis_getData():
    with redis.StrictRedis(connection_pool=redis_pool) as conn:
        bytes_object = conn.get("rec_dataframe")
        if bytes_object is None:
            return None
        buffer = io.BytesIO(bytes_object)
        return pd.read_pickle(buffer) 
    
def redis_setData(df):
    with redis.StrictRedis(connection_pool=redis_pool) as conn:
        buffer = io.BytesIO()
        df.to_pickle(buffer)
        buffer.seek(0)
        bytes_object = buffer.read()
        conn.set('rec_dataframe', bytes_object, 60*60*24*7)
