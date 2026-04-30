import { css } from 'lit';

export const Styles = css`

  .header {
  background: var(--white);
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

.dark-mode .header {
  background: var(--white);
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
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(90deg, var(--white) 0%, rgba(52, 152, 219, 0.5) 50%, var(--white) 100%);
  border-radius: 8px;
  border:0.5rem;
  margin-bottom: 1.5rem;
}

.filter-left {
  flex: 0 0 25%;
}

.filter-right {
  flex: 0 0 auto;
  margin-left: auto;
}

.filter-item {
  display: flex;
  flex-direction: column;
}
.filter-item.label{
padding:0.4rem
}

/* Estilos específicos para botones de editar y eliminar en circuito-operador-lista*/
.btn-edit {
  background: var(--secondary-color);
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 700; /* Bold */
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-edit:hover:not(:disabled) {
  background: #27ae60; /* Verde WCAG compliant */
  color: var(--white);
  font-weight: 700; /* Negrita */
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
}

.btn-delete {
  background: var(--secondary-color);
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 700; /* Bold */
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-delete:hover:not(:disabled) {
  background: #e74c3c; /* Rojo WCAG compliant */
  color: var(--white);
  font-weight: 700; /* Negrita */
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
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

/* Estilos para inputs de filtro */
.header input[type="text"],
.filter-input {
  background: var(--white);
  border: 2px solid var(--light-gray);
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--text-color);
  transition: var(--transition);
  min-width: 200px;
}

.header input[type="text"]:focus,
.filter-input:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.header input[type="text"]:hover,
.filter-input:hover {
  border-color: var(--secondary-color);
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

/* Container for horizontal scrolling */
.table-container {
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}

/* Estilos para la tabla */
table {
  width: 100%;
  min-width: 37.5rem;
  border-collapse: collapse;
  background: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
  table-layout: fixed;
}

/* Primera columna (imagen) más estrecha */
table th:first-child,
table td:first-child {
  width: 15%;
  min-width: 3.75rem;
  text-align: center;
  padding: 0.5rem;
}

table th:nth-child(2), table td:nth-child(2) {
  width: 45%;
  white-space: normal;
  word-wrap: break-word;
}

table th:nth-child(3), table td:nth-child(3) {
  width: 20%;
}

table th:nth-child(4), table td:nth-child(4) {
  width: 20%;
}

table thead {
  background: linear-gradient(135deg, var(--primary-color), #a5c0daff);
  color: var(--white);
}

table th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
  position: sticky;
  top: 0;
  z-index: 10;
  white-space: nowrap;
  border: none;
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
  padding: 0.75rem;
  color: var(--text-color);
  font-size: 0.875rem;
  vertical-align: middle;
  border: none;
}

/* Columna de nombre con wrap */
table td:nth-child(2) {
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
}

/* Imagen por defecto */
table td img {
  max-height: 1.875rem;
  width: auto;
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

table td :hover {
  color: var(--accent-color);
  transform: scale(1.1);
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
  position: relative;
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
@media (max-width: 768px){
  /* Eliminar min-width de la tabla para que se ajuste */
  table {
    min-width: 100%;
  }

  /* Primera columna (imagen) */
  table th:first-child,
  table td:first-child {
    width: 15%;
    min-width: 0;
    padding: 0.2rem;
  }

  /* Columna nombre */
  table th:nth-child(2),
  table td:nth-child(2) {
    width: 45%;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.2;
    font-size: 0.65rem;
    padding: 0.2rem;
  }

  /* Columna duracion */
  table th:nth-child(3),
  table td:nth-child(3) {
    width: 20%;
    font-size: 0.65rem;
    padding: 0.2rem;
  }

  /* Columna precio */
  table th:nth-child(4),
  table td:nth-child(4) {
    width: 20%;
    font-size: 0.65rem;
    padding: 0.2rem;
  }

  /* Headers más compactos */
  table th {
    font-size: 0.65rem;
    padding: 0.5rem 0.5rem;
  }

  table td img {
    width: 100%;
    max-height: none;
    height: auto;
    display: block;
  }
}
`;
