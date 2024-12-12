// api/user_statistics.js

/**
 * This function fetches user statistics data from a React API and returns it in a standardized format.
 * It utilizes the 'fetch' API to get data from the user statistics endpoint.
 * This function will be used by the 'UserStatisticsComponent' function.
 * 
 * @returns {Promise<Object>} The standardized user statistics data
 * @throws {Error} If there is an issue with the request or if the response is not as expected
 */
async function fetchUserStatistics() {
    const API_URL = 'https://api.example.com/user/statistics'; // Replace with your actual API endpoint
    try {
        const response = await fetch(API_URL);
        
        // Validate the response status
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Further validation can be done here to standardize the data if needed
        return data; // Assuming data is already in a standardized format

    } catch (error) {
        console.error("Failed to fetch user statistics: ", error);
        throw new Error("Could not retrieve user statistics. Please try again later.");
    }
}

/**
 * This function serves as a React component that displays user statistics by calling 'fetchUserStatistics'.
 * It handles loading states and errors during the data fetching process.
 * 
 * @returns {JSX.Element} The rendered User Statistics component
 */
function UserStatisticsComponent() {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const statistics = await fetchUserStatistics();
                setData(statistics);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container activeNavId={9}>
            <Header title="User Statistics" />
            <Toaster />
            {isLoading && <Loading />}
            {isError && toast.error("Failed to fetch information. Try again later!")}
            {isError && <Info text="No data found!" />}
            {!isError && <StatisticsChart data={data} />}
        </Container>
    );
}

export { fetchUserStatistics, UserStatisticsComponent };
