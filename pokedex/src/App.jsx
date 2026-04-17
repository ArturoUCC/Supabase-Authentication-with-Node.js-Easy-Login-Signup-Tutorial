import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function App() {
  // Estados para la lista y paginación
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0); // Controla en qué número de Pokémon empezamos
  const [loading, setLoading] = useState(false);
  
  // Estado para la búsqueda individual
  const [searchResult, setSearchResult] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const LIMIT = 20;

  // 1. Función para traer 20 Pokémon (Lista)
  const fetchPokemonList = async () => {
    setLoading(true);
    setSearchResult(null); // Limpiamos búsqueda individual si existe
    try {
      // Paso A: Pedimos la lista de nombres y URLs
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
      const data = await response.json();

      // Paso B: Como la lista solo trae nombres, necesitamos "cocinar" cada uno
      // Usamos Promise.all para buscar los detalles de los 20 al mismo tiempo
      const detailPromises = data.results.map(async (p) => {
        const res = await fetch(p.url);
        return res.json();
      });

      const allDetails = await Promise.all(detailPromises);
      setPokemonList(allDetails);
    } catch (error) {
      console.error("Error cargando la lista", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Función para búsqueda individual
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setLoading(true);
    setPokemonList([]); // Escondemos la lista para mostrar el resultado
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      alert("Pokémon no encontrado");
      fetchPokemonList(); // Si no lo encuentra, volvemos a la lista
    } finally {
      setLoading(false);
    }
  };

  // Efecto: Cada vez que el 'offset' cambie, traemos nuevos Pokémon
  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokédex Pro</h1>
      
      {/* Buscador */}
      <form onSubmit={handleSearch} style={styles.form}>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Buscar</button>
        <button type="button" onClick={() => {setOffset(0); setInputValue(''); fetchPokemonList();}} style={{...styles.button, backgroundColor: '#3498db'}}>Ver Todos</button>
      </form>

      {/* Botones de Paginación */}
      {!searchResult && (
        <div style={styles.pagination}>
          <button 
            disabled={offset === 0} 
            onClick={() => setOffset(offset - LIMIT)}
            style={offset === 0 ? styles.disabledBtn : styles.pageBtn}
          >
            ⬅️ Anterior
          </button>
          <span style={styles.pageText}>Mostrando {offset + 1} - {offset + LIMIT}</span>
          <button 
            onClick={() => setOffset(offset + LIMIT)}
            style={styles.pageBtn}
          >
            Siguiente ➡️
          </button>
        </div>
      )}

      {loading && <h2 style={{color: 'white'}}>Cargando Pokédex...</h2>}

      {/* Contenedor de Tarjetas */}
      <div style={styles.grid}>
        {/* Caso A: Mostrar resultado de búsqueda */}
        {searchResult && <PokemonCard pokemon={searchResult} />}

        {/* Caso B: Mostrar lista de 20 */}
        {!searchResult && pokemonList.map(poke => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#2c3e50', padding: '20px' },
  title: { color: '#f1c40f', fontSize: '3rem', marginBottom: '20px' },
  form: { marginBottom: '30px', display: 'flex', gap: '10px' },
  input: { padding: '12px', borderRadius: '25px', border: 'none', width: '200px' },
  button: { padding: '10px 20px', borderRadius: '25px', border: 'none', backgroundColor: '#e74c3c', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  grid: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: '30px', 
    maxWidth: '1400px' 
  },
  pagination: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  pageBtn: { padding: '10px 15px', borderRadius: '5px', backgroundColor: '#f1c40f', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
  disabledBtn: { padding: '10px 15px', borderRadius: '5px', backgroundColor: '#95a5a6', border: 'none', cursor: 'not-allowed' },
  pageText: { color: 'white', fontWeight: 'bold' }
};

export default App;