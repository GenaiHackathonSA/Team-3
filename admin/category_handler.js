// admin/category_handler.js

import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../services/authService';  // Assuming you have an AuthService for authentication headers
import { API_BASE_URL } from '../config'; // Define your API base URL in a config file

/**
 * createCategory - This function allows an admin to create a new category for content organization in a React environment.
 * It takes input from a form, validates the data, and sends a request to the backend API to save the category.
 * It will be used in the category creation component for a seamless user experience.
 *
 * @param {string} categoryName - The name of the category to be created.
 * @returns {Promise<void>}
 */
export const createCategory = async (categoryName) => {
    try {
        // Validate the category name
        if (!categoryName || categoryName.trim() === '') {
            throw new Error('Category name is required and cannot be empty.');
        }

        const response = await axios.post(
            `${API_BASE_URL}/category/create`, 
            { name: categoryName },
            {
                headers: AuthService.authHeader(),
            }
        );

        if (response.data.status === 'SUCCESS') {
            toast.success('Category created successfully!');
            // Optionally, you might want to return the created category or ID
        } else {
            throw new Error(response.data.message || 'Failed to create category.');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200
            toast.error(error.response.data.message || 'An error occurred while creating the category. Please try again later.');
        } else if (error.request) {
            // Request was made but no response received
            toast.error('Network error: Unable to reach the server. Please check your connection and try again.');
        } else {
            // Something happened while setting up the request
            toast.error(error.message || 'An unexpected error has occurred.');
        }
    }
};
