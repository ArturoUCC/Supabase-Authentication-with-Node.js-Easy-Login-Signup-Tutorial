// Mapeo de tipos de emoji para los iconos de energía
const typeEnergyIcons = {
  electric: '⚡', fire: '🔥', water: '💧', grass: '🍃', fighting: '✊',
  psychic: '👁️', darkness: '🌙', metal: '⚔️', fairy: '✨', dragon: '🐉', normal: '◯',
};

// 🌟 INSTRUCCIÓN 2: Ahora recibe el OBJETO pokemon completo por props
const PokemonCard = ({ pokemon }) => {
  // Si por alguna razón el objeto viene vacío, no dibujamos nada
  if (!pokemon) return null;

  // Extraemos estadísticas
  const hp = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
  const attackDamage = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
  
  const mainType = pokemon.types[0]?.type.name;
  const typeIcon = typeEnergyIcons[mainType] || '◯';

  const energyCost = new Array(3).fill(typeIcon);
  const attackName = `${mainType.toUpperCase()} PUÑO`;

  return (
    <div style={styles.tcgCard}>
      {/* Cabecera */}
      <div style={styles.cardHeader}>
        <div style={styles.basicLabelContainer}>
          <span style={styles.basicLabel}>BÁSICO</span>
        </div>
        <h2 style={styles.pokemonName}>{pokemon.name.toUpperCase()}</h2>
        <div style={styles.hpAndType}>
          <span style={styles.hpLabel}>PS</span>
          <span style={styles.hpValue}>{hp}</span>
          <span style={styles.typeIconHeader}>{typeIcon}</span>
        </div>
      </div>

      {/* Imagen */}
      <div style={styles.imageContainer}>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name} 
          style={styles.image}
        />
      </div>

      {/* Info Bar */}
      <div style={styles.infoBar}>
        <p style={{margin: 0}}>
          Tipo: {pokemon.types.map(t => t.type.name).join(', ')} • Peso: {pokemon.weight / 10} kg • N.º {pokemon.id}
        </p>
      </div>

      {/* Ataques */}
      <div style={styles.attacksSection}>
        <div style={styles.attackRow}>
          <div style={styles.energyCostContainer}>
            {energyCost.map((icon, index) => (
              <span key={index}>{icon}</span>
            ))}
          </div>
          <strong style={styles.attackName}>{attackName}</strong>
          <span style={styles.damageValue}>{attackDamage}</span>
        </div>
        <hr style={styles.divider}/>
        <p style={styles.flavorText}>
          {`Lanza 1 moneda. Si sale cara, este ataque hace ${attackDamage * 2} de daño. Si sale cruz, el daño base es el mismo.`}
        </p>
      </div>

      {/* Pie de página */}
      <div style={styles.bottomBar}>
        <div style={styles.statGroup}>
          <small style={styles.statLabel}>Debilidad</small>
          <span style={styles.statValue}>🔥 x2</span>
        </div>
        <div style={styles.statGroup}>
          <small style={styles.statLabel}>Resistencia</small>
          <span style={styles.statValue}></span>
        </div>
        <div style={styles.statGroup}>
          <small style={styles.statLabel}>Retirada</small>
          <span style={styles.statValue}>
            {typeEnergyIcons.normal}{typeEnergyIcons.normal}
          </span>
        </div>
      </div>
    </div>
  );
};

// Los mismos estilos, solo quité messageCard porque ya no se usa aquí
const styles = {
  tcgCard: { width: '320px', height: '450px', backgroundColor: '#f1c40f', borderRadius: '15px', padding: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', fontFamily: '"Trebuchet MS", sans-serif', display: 'flex', flexDirection: 'column', border: '3px solid #f9e16d' },
  cardHeader: { display: 'flex', alignItems: 'center', marginBottom: '8px', justifyContent: 'space-between', padding: '0 5px' },
  basicLabelContainer: { paddingRight: '10px' },
  basicLabel: { fontSize: '10px', fontWeight: 'normal', color: '#111', fontStyle: 'italic', padding: '2px 5px', border: '1px solid #111', borderRadius: '3px', whiteSpace: 'nowrap' },
  pokemonName: { margin: 0, fontSize: '22px', fontWeight: '900', color: '#111', flexGrow: 1, textAlign: 'left', fontFamily: '"Arial Black", Arial, sans-serif' },
  hpAndType: { display: 'flex', alignItems: 'baseline', gap: '2px' },
  hpLabel: { fontSize: '12px', color: '#c0392b' },
  hpValue: { fontSize: '24px', fontWeight: 'bold', color: '#c0392b' },
  typeIconHeader: { fontSize: '20px', marginLeft: '5px' },
  imageContainer: { backgroundColor: '#eee', border: '2px solid #ddd', borderRadius: '2px', height: '190px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'contain' },
  infoBar: { backgroundColor: '#e6e6e6', padding: '2px 5px', fontSize: '10px', textAlign: 'center', fontStyle: 'italic', marginTop: '6px', border: '1px solid #7f8fa6', color: '#333', fontFamily: 'Arial, sans-serif' },
  attacksSection: { marginTop: '10px', flexGrow: 1, padding: '10px', backgroundColor: '#fffdf6', borderRadius: '5px', border: '1px solid #ddd' },
  attackRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '18px', color: '#333', marginBottom: '5px' },
  energyCostContainer: { display: 'flex', gap: '2px', fontSize: '18px', paddingRight: '10px' },
  attackName: { flexGrow: 1, textAlign: 'left', fontSize: '18px', color: '#111' },
  damageValue: { fontWeight: 'bold', fontSize: '20px', color: '#111' },
  divider: { borderColor: '#e0e0e0', margin: '8px 0', borderStyle: 'solid', borderWidth: '0.5px' },
  flavorText: { fontSize: '12px', textAlign: 'justify', color: '#555', lineHeight: '1.4', margin: 0, fontFamily: 'Arial, sans-serif' },
  bottomBar: { marginTop: 'auto', padding: '5px 10px', fontSize: '11px', color: '#333', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', backgroundColor: 'white', borderRadius: '0 0 12px 12px' },
  statGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
  statLabel: { fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' },
  statValue: { fontSize: '12px', fontWeight: 'bold', color: '#222' }
};

export default PokemonCard;