import pytest
from api.user_stats import fetch_user_statistics, get_user_statistics

# Tests for fetch_user_statistics function
def test_fetch_user_statistics():
    """
    Test the fetch_user_statistics function to ensure that it correctly handles requests
    and returns the expected data format and values.
    """
    # Given
    expected_result = {
        "total_users": 100,
        "active_users": 80,
        "inactive_users": 20
    }
    
    # When
    result = fetch_user_statistics()

    # Then
    assert isinstance(result, dict), "Result should be a dictionary"
    assert result == expected_result, f"Expected {expected_result}, but got {result}"

# Tests for get_user_statistics function
def test_get_user_statistics():
    """
    Test the get_user_statistics function to verify that it interacts correctly 
    with the database and returns accurate statistics.
    """
    # Mock database response
    mock_response = {
        "total_users": 150,
        "active_users": 120,
        "inactive_users": 30
    }
    
    # Assuming we have a function `mock_db_query` that simulates a database call
    def mock_db_query():
        return mock_response

    # Replace the actual database call with the mock
    original_db_query = get_user_statistics.__globals__['db_query']
    get_user_statistics.__globals__['db_query'] = mock_db_query

    try:
        # When
        result = get_user_statistics()

        # Then
        assert isinstance(result, dict), "Result should be a dictionary"
        assert result == mock_response, f"Expected {mock_response}, but got {result}"
    finally:
        # Restore the original database query function
        get_user_statistics.__globals__['db_query'] = original_db_query
