
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify


from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import SGDClassifier
from sklearn.externals import joblib
import pandas as pd
import numpy as np
import re
import nltk

from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from nltk.stem.wordnet import WordNetLemmatizer

def pre_process(text):
    text = text.upper()
    text = re.sub("(\\d|\\W)+", " ", text)
    return text

def predict(data):
	X_test = data
	X_test = pre_process(X_test)


	stopwords = ["THE", "FOR", "A", "AN", "IN", "OURSELVES", "OUR", "OURSELF", 
            "YOU", "YOUR", "YOURS" , "YOURSELF", "YOURSELVES","ME", "MY", "MINE", "BUT", "AGAIN",
            "IT", "ITS", "THEY", "THEIR", "THEIRS", "AS", "I", "AM", "IS", "ARE", "THEM", "DO",
            "DOING", "OF", "HE", "SHE", "HIM", "HER", "HERSELF", "HIMSELF", "THROUGH", "AND", "BEEN",
            "HAVE", "HAVING", "HAS", "WILL", "AND", "DID", "WITH", "TO", "UP" ]



	doc = []
	
	tokens = nltk.word_tokenize(X_test)
	filtered = ""
	for w in tokens:
		if w not in stopwords:
			filtered = filtered + " " + w
    
	doc.append(filtered)
	keywords = doc
	nb = joblib.load("naivebayesNew.pkl")
	y = nb.predict(keywords)
	svm = joblib.load("svmNew.pkl")
	y1 = svm.predict(keywords)
	log = joblib.load("logisticNew.pkl")
	y2 = log.predict(keywords)
	sgd = joblib.load("sgdNew.pkl")
	y3 = sgd.predict(keywords)
	
	d = {y[0] : 1}
	d['naivebayes'] = y[0]
	d['svm'] = y1[0]
	d['logistic'] = y2[0]
	d['sgd'] = y3[0]
	maxc = 1
	max2 = 1
	occur = y[0]
	if d.__contains__(y1[0]) == True:
		d[y1[0]] = d.get(y1[0]) + 1
        
	else:
		d[y1[0]] = 1
    
	if d.get(y1[0]) > maxc:
		maxc = d.get(y1[0])
		occur = y1[0]

	if d.__contains__(y2[0]) == True:
		d[y2[0]] = d.get(y2[0]) + 1
	else:
		d[y2[0]] = 1
    
	if d.get(y2[0]) > maxc:
		maxc = d.get(y2[0])
		occur = y2[0]

	if d.__contains__(y3[0]) == True:
		d[y3[0]] = d.get(y3[0]) + 1
	else:
		d[y3[0]] = 1

	if d.get(y3[0]) > maxc:
		maxc = d.get(y3[0])
		occur = y3[0]

	print(d)
	print("Predicted Category : " + occur)
	d["occur"] = occur
	



	return d


app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route("/" , methods = ['GET' , 'POST'])
def classify_report():
	data = request.get_json()
	output = predict(data['desc'])
	print(output)
	return jsonify(output)

if __name__ == '__main__':
    
   app.run(port=5002, debug=True)
