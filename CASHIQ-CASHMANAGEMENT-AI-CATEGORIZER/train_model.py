import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib

# 1. The "Textbook" - Small data to start with.
# Later, we will load this from a CSV file in the /data folder.
data = [
    ('Starbucks', 'Food & Drink'),
    ('McDonalds', 'Food & Drink'),
    ('Uber', 'Transportation'),
    ('Metro Ticket', 'Transportation'),
    ('Netflix', 'Entertainment'),
    ('Spotify', 'Entertainment'),
    ('Salary', 'Income'),
    ('Vegetables', 'Groceries'),
    ('Milk and Eggs', 'Groceries'),
    ('Doctor Fee', 'Health'),
    ('Medicine', 'Health')
]

# Convert list to a Table (DataFrame)
df = pd.DataFrame(data, columns=['description', 'category'])

# 2. Build the Model Pipeline
# CountVectorizer: Turns words into numbers (Math)
# MultinomialNB: The algorithm that guesses categories
model = make_pipeline(CountVectorizer(), MultinomialNB())

# 3. Train (Fit) the model
print("Training the model...")
model.fit(df['description'], df['category'])

# 4. Save the "Brain" to the model folder
joblib.dump(model, 'model/expense_model.pkl')
print("Success! Model saved to model/expense_model.pkl")