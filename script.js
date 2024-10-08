// Select the input field and the div where the result will be displayed
const idInput = document.getElementById('id_fruta');
const frutaResult = document.getElementById('fruta_result');

// Add event listener to the input field to trigger the search
idInput.addEventListener('input', async () => {


    // BUSCA DADOS --------------------------------------
    const id = idInput.value;
    if (id) {
        try {
            // Make a request to the server to fetch fruit data by ID
            const response = await fetch(`http://localhost:3000/frutas/${id}`);
            if (!response.ok) {
                throw new Error('Fruta não encontrada');
            }
            const fruta = await response.json();
            // Display the result in the frutaResult div
            frutaResult.textContent = `Fruta: ${fruta.nome}`; // Adjust based on your table fields
        } catch (error) {
            // Display error message if there's an issue
            frutaResult.textContent = 'Erro ao buscar dados: ' + error.message;
        }
    } else {
        // Clear the result if the input field is empty
        frutaResult.textContent = '';
    }


    // CRIAC DADOS --------------------------------------

    
});