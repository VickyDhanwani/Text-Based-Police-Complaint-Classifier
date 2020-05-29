import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import classification_report
from sklearn.linear_model import SGDClassifier
from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.externals import joblib
from sklearn.svm import LinearSVC
data = pd.read_csv("police_complaints.csv", sep=';')
#test_set = pd.read_csv("test.csv")
#data = data[data['Reported_As'] != 'MISC OFFICER IN']
#data = data[data['Reported_As'] != 'PUBLIC SERVICE']


print(data.Reported_As.unique())
print(data.shape)
col = ['Offense', 'Reported_As']



#data['allegation'] = data['allegationType'].str.cat(data['allegation'], sep = " ")

#test_set['allegation'] = test_set['allegationType'].str.cat(test_set['allegation'], sep = " ")

complaints = data[col]

complaints.columns = ['allegation', 'finding']

X = complaints.allegation
Y = complaints.finding
X_train = X
Y_train = Y



X_train, X_test, Y_train, Y_test = train_test_split( X, Y, test_size = 0.33, random_state = 42)

nb = Pipeline([('vect', CountVectorizer(ngram_range=(1, 4))),
               ('tfidf', TfidfTransformer()),
               ('clf', MultinomialNB()),
    ])

nb.fit(X_train, Y_train)
joblib.dump(nb, 'naivebayesNew.pkl')
y_pred = nb.predict(X_test)
#print(Y_test.head(10))



sgd = Pipeline([('vect', CountVectorizer(ngram_range=(1, 4))),
                ('tfidf', TfidfTransformer()),
                ('clf', SGDClassifier(loss='hinge', penalty='l2',alpha=1e-3, random_state=42, max_iter=5, tol=None)),
               ])
sgd.fit(X_train, Y_train)
joblib.dump(sgd, 'sgdNew.pkl')
y1_pred = sgd.predict(X_test)

svm = Pipeline([('vect', CountVectorizer(ngram_range=(1, 4))),
                ('tfidf', TfidfTransformer()),
                ('clf', LinearSVC()),
               ])
svm.fit(X_train, Y_train)
joblib.dump(svm, 'svmNew.pkl')


logreg = Pipeline([('vect', CountVectorizer(ngram_range=(1, 4))),
                ('tfidf', TfidfTransformer()),
                ('clf', LogisticRegression()),
               ])



logreg.fit(X_train, Y_train)
joblib.dump(logreg, 'logisticNew.pkl')
y2_pred = logreg.predict(X_test)


 
print('\n accuracy using Multinomial Naive Bayes %s' % accuracy_score(y_pred, Y_test))
print('accuracy using SVM %s' % accuracy_score(y1_pred, Y_test))
print('\n accuracy using Logistic Regression %s' % accuracy_score(y2_pred, Y_test))



