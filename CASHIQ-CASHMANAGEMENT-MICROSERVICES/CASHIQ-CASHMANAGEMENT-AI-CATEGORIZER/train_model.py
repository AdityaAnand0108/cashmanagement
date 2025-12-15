import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib

# 1. Load Data from CSV
# We are now loading the "Real World" data we generated earlier.
# Ensure 'realistic_bank_transactions.csv' is in the same folder as this script.
print("Loading data from CSV...")
try:
    df = pd.read_csv('realistic_bank_transactions.csv')

    # Standardize column names to lowercase for consistency
    df.columns = df.columns.str.lower()

    # Preview the data to ensure it loaded correctly
    print(f"Loaded {len(df)} transactions.")
    print(df.head(3))

except FileNotFoundError:
    print("Error: 'realistic_bank_transactions.csv' not found. Please generate the data first.")
    exit()

# 2. Build the Model Pipeline
# CountVectorizer: Converts text (e.g., "Starbucks") into numbers (Vectors)
# MultinomialNB: The "Naive Bayes" algorithm that classifies the data
model = make_pipeline(CountVectorizer(), MultinomialNB())

# 3. Train (Fit) the model
# We teach the model: "When you see Description X, it belongs to Category Y"
print("Training the model on 500 rows...")
model.fit(df['description'], df['category'])

# 4. Save the "Brain"
# This .pkl file will be loaded by your Java/Spring Boot backend later.
output_path = 'model/expense_model.pkl'

# Ensure the directory exists
import os

os.makedirs(os.path.dirname(output_path), exist_ok=True)

joblib.dump(model, output_path)
print(f"Success! Intelligence saved to {output_path}")

