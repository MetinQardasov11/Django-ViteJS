import { useEffect, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import './App.css'

function App() {
    const [data, setData] = useState([]);
    const [darkMode, setDarkMode] = useState(true);  // Set default to true

    useEffect(() => {
        async function fetchData() {
            console.log(import.meta.env.VITE_API_URL)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/`)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json()
            console.log(result);
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error)    
        }
    }
        fetchData();

        // Check for user's preference, default to true if not set
        const isDarkMode = localStorage.getItem('darkMode') !== 'false';
        setDarkMode(isDarkMode);
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [])
    
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.body.classList.toggle('dark-mode', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    }
    
    return (
        <Container>
            <Button 
                onClick={toggleDarkMode} 
                variant={darkMode ? "light" : "dark"}
                className="mt-3 mb-3"
            >
                Toggle {darkMode ? "Light" : "Dark"} Mode
            </Button>
            <h1>Posts</h1>
            <Table striped bordered hover variant={darkMode ? "dark" : "light"}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default App
