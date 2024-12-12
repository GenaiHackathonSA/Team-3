# api/user_stats.py

from flask import Flask, request, jsonify
from database import fetch_user_stats_from_db  # Hypothetical function for database interaction
from flask_jsonschema import JsonSchema, validate
from extensions import API_BASE_URL  # Assuming there are configurations or constants imported from an extensions module

app = Flask(__name__)
schema = JsonSchema(app)

@app.route('/api/user/stats', methods=['GET'])
@schema.validate(filename='schema/user_stats_schema.json')  # Hypothetical schema validation for the API
def fetch_user_statistics():
    """
    This function will handle the API request, retrieve user statistics data 
    from the database or service, and return the data in a structured format. 
    It will be the main entry point for the API that frontend will call.
    """
    try:
        # Assuming request has parameters like 'user_id'
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        # Fetch user statistics using the helper function
        statistics = get_user_statistics(user_id)
        return jsonify(statistics), 200

    except Exception as e:
        # Return a generic error response
        print(f"An error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


def get_user_statistics(user_id):
    """
    This function will retrieve the user statistics from the database. 
    It will make use of fetch_user_statistics to return the results properly 
    formatted for the front end.
    """
    try:
        # Fetch user statistics from the database
        user_stats = fetch_user_stats_from_db(user_id)
        if user_stats is None:
            return {"message": "No statistics found for this user."}
        return user_stats

    except Exception as e:
        print(f"An error occurred while fetching user statistics: {e}")
        return {"error": "Failed to fetch user statistics"}, 500
