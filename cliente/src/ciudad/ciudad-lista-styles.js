import { css } from 'lit';

export const Styles = css`
/* Estilos para el header */
  .header {
    background: linear-gradient(135deg, var(--white) 0%, var(--light-gray) 100%);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto auto;
    gap: 1.5rem;
    align-items: center;
  }

  .header h1 {
    grid-column: 1 / 2;
    grid-row: 1;
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0;
    letter-spacing: -0.5px;
  }

  /* Estilos para modo oscuro */
  .dark-mode {
    --primary-color: #ecf0f1;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #ecf0f1;
    --light-gray: #34495e;
    --white: #2c3e50;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    color: var(--text-color) !important;
  }

  .dark-mode .header,
  .dark-mode .stats,
  .dark-mode .header h1,
  .dark-mode .stats-number,
  .dark-mode .stats-label {
    color: var(--text-color) !important;
  }

  .dark-mode .city-name-item {
    background-color: var(--secondary-color) !important;
  }

  /* Estados de carga y error */
  .loading {
    text-align: center;
    padding: 3rem;
    color: var(--text-color);
    opacity: 0.7;
  }

  .error {
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
    color: #c62828;
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    border-left: 4px solid #f44336;
  }

  /* Sección de búsqueda */
  .search-section {
    margin-bottom: 2rem;
  }

  .search-input {
    width: 100%;
    max-width: 400px;
    padding: 0.75rem;
    border: 1px solid var(--light-gray);
    border-radius: var(--border-radius);
    font-size: 1rem;
    background: var(--white);
    color: var(--text-color);
    transition: var(--transition);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
    /* Contenedor de filtros */
.filters-container {
  grid-column: 1 / -1;
  grid-row: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1.5rem;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(90deg, var(--white) 0%, rgba(52, 152, 219, 0.5) 50%, var(--white) 100%);
  border-radius: 8px;
  border:0.5rem;
  margin-bottom: 1.5rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
}
.filter-item.label{
padding:0.4rem
}

/* Estilos para labels */
.header label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-right: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Estilos para selects */
.header select {
  background: var(--white);
  border: 2px solid var(--light-gray);
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
  min-width: 140px;
}

  /* Estadísticas */
  .stats {
    background: linear-gradient(135deg, var(--white) 0%, var(--light-gray) 100%);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
    text-align: center;
    box-shadow: var(--shadow);
  }

  .stats-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .stats-label {
    color: var(--text-color);
    font-size: 0.9rem;
    opacity: 0.8;
  }
    
  /* Estilos para la lista de ciudades en grid */
  .cities-list-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .city-name-item {
    background: linear-gradient(90deg, var(--white) 0%, var(--light-gray) 100%);
    padding: 1rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    color: var(--text-color);
    cursor: pointer;
    transition: var(--transition);
    text-align: center;
    font-weight: 500;
    border: 2px solid transparent;
  }

  .city-name-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(52, 152, 219, 0.2);
    border-color: var(--secondary-color);
    background: var(--secondary-color);
    color: var(--primary-color);
  }

  .ciudad-dialog {
    all: unset;
    display: block;
    position: fixed;
    top: 10%;
    left: 15%;
    width: 70%;
    max-height: 80%;
    overflow: auto;
    background: var(--white);
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
  }

  .ciudad-dialog table {
    width: 100%;
    border-collapse: collapse;
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    table-layout: fixed;
  }

  .ciudad-dialog table th:nth-child(1), .ciudad-dialog table td:nth-child(1) {
    width: 20%;
  }

  .ciudad-dialog table th:nth-child(2), .ciudad-dialog table td:nth-child(2) {
    width: 40%;
  }

  .ciudad-dialog table th:nth-child(3), .ciudad-dialog table td:nth-child(3) {
    width: 20%;
  }

  .ciudad-dialog table th:nth-child(4), .ciudad-dialog table td:nth-child(4) {
    width: 20%;
  }

  .ciudad-dialog table thead {
    background: linear-gradient(135deg, var(--primary-color), #a5c0daff);
    color: var(--white);
  }

  .ciudad-dialog table th {
    padding: 1rem 1.5rem;
    text-align: left;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.875rem;
    position: relative;
  }

  .ciudad-dialog table th[style*="cursor:pointer"] {
    user-select: none;
    transition: var(--transition);
  }

  .ciudad-dialog table th[style*="cursor:pointer"]:hover {
    background: rgba(18, 124, 156, 0.59);
  }

  .ciudad-dialog table tbody tr {
    border-bottom: 1px solid var(--light-gray);
    transition: var(--transition);
  }

  .ciudad-dialog table tbody tr:hover {
    background: rgba(52, 152, 219, 0.5);
  }

  .ciudad-dialog table tbody tr:last-child {
    border-bottom: none;
  }

  .ciudad-dialog table td {
    padding: 1rem 1.5rem;
    color: var(--text-color);
    font-size: 0.875rem;
    vertical-align: middle;
  }

  .ciudad-dialog table td img {
    width: 80%;
    height: auto;
  }

  .ciudad-dialog .popup-close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    color: var(--primary-color);
    transition: color 0.3s ease;
  }

  .ciudad-dialog .popup-close-button:hover {
    color: var(--accent-color);
  }

  .city-name-item:active {
    transform: translateY(0);
    box-shadow: var(--shadow);
  }

  .no-cities {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: var(--text-color);
    opacity: 0.7;
    font-style: italic;
    background: linear-gradient(135deg, var(--white) 0%, var(--light-gray) 100%);
    border-radius: var(--border-radius);
    border: 2px dashed var(--light-gray);
  }

  /* Responsive para el grid de ciudades */
  @media (max-width: 768px) {
    .cities-list-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.75rem;
    }

    .city-name-item {
      padding: 0.75rem;
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    .cities-list-grid {
      grid-template-columns: 1fr;
    }
  }

  .stats::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    pointer-events: none;
    border-radius: var(--border-radius);
  }
    }

  /* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
}

table thead {
  background: linear-gradient(135deg, var(--primary-color), #a5c0daff);
  color: var(--white);
}

table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
  position: relative;
}

table th[style*="cursor:pointer"] {
  user-select: none;
  transition: var(--transition);
}

table th[style*="cursor:pointer"]:hover {
  background: rgba(18, 124, 156, 0.59);
}

table tbody tr {
  border-bottom: 1px solid var(--light-gray);
  transition: var(--transition);
}

table tbody tr:hover {
  background: rgba(52, 152, 219, 0.5);
}

table tbody tr:last-child {
  border-bottom: none;
}

table td {
  padding: 1rem 1.5rem;
  color: var(--text-color);
  font-size: 0.875rem;
  vertical-align: middle;
}

  /* Responsive design */
  @media (max-width: 768px) {
    .header {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .header h1 {
      font-size: 1.8rem;
    }

    table th,
    table td {
      padding: 0.75rem;
      font-size: 0.8rem;
    }

    .search-input {
      max-width: 100%;
    }
  }

  /* Animaciones */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .header,
  .stats,
  table {
    animation: fadeIn 0.3s ease-out;
  }

  /* Mejoras visuales adicionales */
  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    pointer-events: none;
    border-radius: var(--border-radius);
  }

  .stats::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    pointer-events: none;
    border-radius: var(--border-radius);
  }
    }
  `