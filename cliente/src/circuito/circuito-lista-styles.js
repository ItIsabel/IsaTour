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

/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
  table-layout: fixed;
}

table th:nth-child(1), table td:nth-child(1) {
  width: 20%;
}

table th:nth-child(2), table td:nth-child(2) {
  width: 40%;
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

table td img {
  width: 60%;
  height: auto;
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

/* Estilos específicos para botones de editar y eliminar */
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
  position: relative;
}

.popup-close-button {
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

.popup-close-button:hover {

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

.create-dialog {
  all: unset;
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 3000;
  border: none;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-section h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.25);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

.btn-save {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #218838;
}

.field-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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

  .create-dialog {
    margin: 1rem;
    width: calc(100% - 2rem);
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

  .create-dialog {
    margin: 0.5rem;
    width: calc(100% - 1rem);
    padding: 1rem;
  }
}
`;
