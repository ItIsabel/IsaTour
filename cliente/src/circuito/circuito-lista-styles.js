import { css } from 'lit';

export const Styles = css`
  :root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --text-color: #2c3e50;
  --light-gray: #ecf0f1;
  --white: #ffffff;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

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
  background: linear-gradient(135deg, #677de8, #754ca3);
  border-radius: 8px;
  border:0.5rem;
  margin-bottom: 1.5rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
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

.header select:hover {
  border-color: var(--secondary-color);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
}

.header select:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* Mensaje de error */
.error {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: var(--white);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.2);
  border-left: 4px solid rgba(255, 255, 255, 0.3);
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
  background: rgba(164, 224, 242, 0.59);
}

table tbody tr {
  border-bottom: 1px solid var(--light-gray);
  transition: var(--transition);
}

table tbody tr:hover {
  background: rgba(52, 152, 219, 0.13);
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

/* Enlaces en la tabla */
table td a {
  color: var(--secondary-color);
  text-decoration: none;
  font-size: 1.2rem;
  transition: var(--transition);
  display: inline-block;
}

table td a:hover {
  color: var(--accent-color);
  transform: scale(1.1);
}

/* Botones dentro de la tabla */
table td button {
  background: var(--secondary-color);
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

table td button:hover:not(:disabled) {
  background: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
}

table td button:disabled {
  background: var(--light-gray);
  color: #95a5a6;
  cursor: not-allowed;
}

/* Popup de extensiones */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease-out;
}

.popup-content {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

.popup-content h3 {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  border-bottom: 2px solid var(--light-gray);
  padding-bottom: 0.5rem;
}

.popup-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.popup-content li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: var(--light-gray);
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-size: 0.875rem;
  border-left: 4px solid var(--secondary-color);
}

.popup-content button {
  background: var(--accent-color);
  color: var(--white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
}

.popup-content button:hover {
  background: #c0392b;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design para la página de circuitos */
@media (max-width: 768px) {
  .header {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
    padding: 1.5rem;
  }
  
  .header h1 {
    grid-column: 1;
    grid-row: 1;
    font-size: 1.75rem;
    text-align: center;
  }


  .filters-container {
    grid-row: 3;
    flex-direction: column;
    align-items: stretch;
  }
  
  .header select {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  table {
    font-size: 0.75rem;
  }
  
  table th,
  table td {
    padding: 0.75rem 0.5rem;
  }
  
  .popup-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
  
  table {
    overflow-x: auto;
    display: block;
    white-space: nowrap;
  }
  
  table thead,
  table tbody,
  table tr {
    display: block;
  }
  
  table th,
  table td {
    display: inline-block;
    width: 120px;
    text-align: center;
  }
`;
