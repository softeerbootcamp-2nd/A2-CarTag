from flask import Flask, request
import recommend

app = Flask(__name__)

@app.route('/recommend/apriori', methods=['POST'])
def apriori():
    data = request.get_json()
    return recommend.recByApriori(data)

if __name__ == '__main__':
    app.run(port=5001, debug=True)