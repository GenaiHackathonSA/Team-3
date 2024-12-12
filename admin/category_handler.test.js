import { render, fireEvent, waitFor } from '@testing-library/react';
import AdminCategoriesManagement from '../pages/admin/categories';
import * as UserService from '../services/userService';
import { toast } from 'react-toastify';
import { act } from 'react-dom/test-utils';

jest.mock('../services/userService');

describe('AdminCategoriesManagement', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('testCreateCategory - verifies createCategory function behavior', async () => {
        const newCategory = { name: 'New Category' };

        // Mocking the user service to simulate successful category creation response.
        UserService.get_categories.mockResolvedValue({
            data: {
                status: 'SUCCESS',
                response: [],
            },
        });

        const { getByText, getByLabelText } = render(<AdminCategoriesManagement />);

        // Assuming there is a form to create a category
        const nameInput = getByLabelText(/category name/i); // Adjust this to match your actual label
        const createButton = getByText(/create category/i); // Adjust this to match your actual button text

        // Simulate filling the input and creating a category
        fireEvent.change(nameInput, { target: { value: newCategory.name } });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Category created successfully!");
        });

        expect(UserService.get_categories).toHaveBeenCalled();
    });

    test('testCreateCategory - handles errors when API request fails', async () => {
        UserService.get_categories.mockRejectedValue({
            response: {
                data: {
                    response: 'Error creating category',
                },
            },
        });

        const { getByText, getByLabelText } = render(<AdminCategoriesManagement />);
        const nameInput = getByLabelText(/category name/i); // Adjust this to match your actual label
        const createButton = getByText(/create category/i); // Adjust this to match your actual button text

        // Simulate filling the input and creating a category
        fireEvent.change(nameInput, { target: { value: 'New Category' } });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error creating category');
        });

        expect(UserService.get_categories).toHaveBeenCalled();
    });
});
