from flask import Flask, request, jsonify
import joblib
from utils.extractors import extract_amount, extract_date, extract_source

app = Flask(__name__)

# Load the brain we trained in Step 4
try:
    model = joblib.load('model/expense_model.pkl')
    print("AI Model Loaded Successfully!")
except:
    print("WARNING: Model not found. Please run train_model.py first.")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 1. Receive JSON data from Java
        data = request.get_json()
        raw_text = data.get('description', '')

        # 2. Extract Data (Rule-based)
        amount = extract_amount(raw_text)
        date_str = extract_date(raw_text)
        source = extract_source(raw_text)

        # 3. Predict Category (AI-based)
        # We wrap raw_text in a list [] because the model expects a list of inputs
        category = model.predict([raw_text])[0]
        
        # 4. Send back the results
        return jsonify({
            "status": "success",
            "original_text": raw_text,
            "parsed_data": {
                "amount": amount,
                "date": date_str,
                "payment_source": source,
                "category": category
            }
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    # Run the server on Port 5000
    app.run(port=5000, debug=True)