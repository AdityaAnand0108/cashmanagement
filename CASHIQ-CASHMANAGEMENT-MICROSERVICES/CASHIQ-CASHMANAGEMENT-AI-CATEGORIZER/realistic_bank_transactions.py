import pandas as pd
import random
import numpy as np

# Define categories
categories = [
    'Food', 'Transport', 'Utilities', 'Rent', 'Income',
    'Shopping', 'Entertainment', 'Health', 'Transfer', 'Education'
]

# Define templates/keywords for descriptions for each category (Global + Indian context)
description_patterns = {
    'Food': [
        'Zomato Order #{}', 'Swiggy *{}', 'Starbucks Coffee', 'McDonalds POS',
        'Dominos Pizza', 'Burger King', 'Subway', 'KFC', 'Pizza Hut',
        'Cafe Coffee Day', 'Chai Point', 'Haldirams', 'Bikanervala',
        'Local Kirana Store', 'D-Mart Grocery', 'BigBasket Order', 'Blinkit', 'Zepto',
        'Reliance Fresh', 'More Supermarket', 'Spencer Retail', 'Nature Basket',
        'Tea Post', 'Barbeque Nation', 'Paradise Biryani'
    ],
    'Transport': [
        'Uber Trip {}', 'Ola Cabs Ride', 'Rapido Bike', 'Petrol Shell',
        'Indian Oil Fuel', 'HP Petrol Pump', 'Bharat Petroleum', 'CNG Station',
        'Metro Card Recharge', 'IRCTC Rail Booking', 'RedBus Ticket', 'Abhibus',
        'Fastag Toll Payment', 'Parking Charges', 'Car Service Center',
        'Royal Enfield Service', 'Maruti Suzuki Service'
    ],
    'Utilities': [
        'Jio Mobile Recharge', 'Airtel Bill Payment', 'Vi Postpaid Bill',
        'BSNL Landline', 'Tata Play Subscription', 'DishTV Recharge',
        'Electricity Bill (MSEB)', 'BESCOM Bill Payment', 'Adani Electricity',
        'MGL Gas Bill', 'Indane Gas Booking', 'HP Gas Cylinder',
        'ACT Fibernet Bill', 'JioFiber Bill', 'SpectraNet', 'Water Bill Payment'
    ],
    'Rent': [
        'Monthly Rent Payment', 'House Rent Transfer', 'Society Maintenance',
        'Rent Oct', 'Rent Nov', 'Brokerage Fee', 'Rent Deposit'
    ],
    'Income': [
        'Salary Credited - TCS', 'Salary Credit - Infosys', 'Salary - Wipro',
        'Freelance Payment', 'Upwork Payout', 'Fiverr Credit', 'Interest Credit',
        'Dividend Received', 'Tax Refund', 'Cash Deposit', 'UPI Credit from {}'
    ],
    'Shopping': [
        'Amazon India', 'Flipkart Order', 'Myntra Fashion', 'Ajio', 'Nykaa',
        'Tata Cliq', 'H&M Store', 'Zara', 'Decathlon Sports', 'Reliance Digital',
        'Croma Electronics', 'Vijay Sales', 'Titan Eye Plus', 'Lenskart',
        'Bata Shoe Store', 'Nike Store', 'Adidas Factory Outlet', 'FabIndia',
        'Westside', 'Pantaloons', 'Shoppers Stop'
    ],
    'Entertainment': [
        'Netflix Subscription', 'Amazon Prime', 'Disney+ Hotstar', 'SonyLiv',
        'Zee5 Subscription', 'Spotify Premium', 'Apple Music', 'YouTube Premium',
        'PVR Cinemas', 'INOX Movies', 'BookMyShow', 'Imagica Tickets',
        'Wonderla Entry', 'Steam Games', 'PlayStation Store'
    ],
    'Health': [
        'Apollo Pharmacy', 'Netmeds Order', 'PharmEasy', '1mg Technologies',
        'MedPlus Chemist', 'Dr. {} Clinic', 'Fortis Hospital Bill',
        'Max Healthcare', 'Cult.fit Membership', 'Gold Gym', 'Dental Clinic',
        'Pathology Lab Test', 'Thyrocare', 'Lal PathLabs'
    ],
    'Transfer': [
        'UPI Transfer to {}', 'Neft Transfer to {}', 'IMPS Payout',
        'Sent to Friend', 'Loan Repayment', 'Credit Card Bill Payment',
        'SBI Credit Card', 'HDFC Credit Card', 'ICICI CC Payment', 'Axis Bank CC'
    ],
    'Education': [
        'Udemy Course', 'Coursera Subscription', 'Kindle Ebooks',
        'College Fees', 'School Fee Payment', 'Stationery Shop',
        'Byjus Learning', 'Unacademy Subscription', 'PhysicsWallah',
        'Books Store', 'Crossword Bookstore'
    ]
}

# Names for placeholders
names = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Rohan', 'Anjali', 'Vikram', 'Pooja', 'Suresh', 'Ramesh', 'Mom', 'Dad',
         'Landlord']

data = []

# Generate 500 rows
for _ in range(500):
    # Pick a category based on weights
    category = np.random.choice(
        categories,
        p=[0.25, 0.15, 0.10, 0.05, 0.05, 0.20, 0.10, 0.05, 0.03, 0.02]
    )

    template = random.choice(description_patterns[category])

    # Fill placeholders
    if '{}' in template:
        if 'UPI' in template or 'Transfer' in template or 'Credit from' in template:
            fill = random.choice(names)
        elif 'Dr.' in template:
            fill = random.choice(['Gupta', 'Sharma', 'Patil', 'Mehta', 'Rao'])
        else:
            fill = str(random.randint(1000, 9999))
        description = template.format(fill)
    else:
        description = template

    # Add random noise (prefixes/suffixes)
    if random.random() > 0.3:
        prefix = random.choice(['POS', 'UPI', 'ATM', 'BIL', 'TXN', 'ACH'])
        suffix = str(random.randint(100000, 999999))
        description = f"{prefix} {description} {suffix}"

    description = description.upper()
    data.append([description, category])

# Create DataFrame and Save
df = pd.DataFrame(data, columns=['Description', 'Category'])
df.to_csv('realistic_bank_transactions.csv', index=False)