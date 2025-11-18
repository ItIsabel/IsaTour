import { css } from 'lit';

export const Styles = css`

/* Estilos del header */
.header {
  background: linear-gradient(135deg, var(--primary-color) 60%, var(--secondary-color) 115%);
  border-bottom: 1px solid transparent;
  box-shadow: none;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(0px);
  width: 100%;
  overflow-x: hidden;
}


.header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
}

/* Estilos del logo */
.header__logo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: var(--transition);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header__logo:hover {
  color: var(--secondary-color);
  transform: translateY(-1px);
}

/* Estilo específico para la "a" en italic */
.header__logo i {
  font-style: italic;
  font-weight: 300;
  color: var(--accent-color);
  margin: 0 2px;
}

/* Navegación */
.header__nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Botones de navegación */
.header__button {
  background: transparent;
  border: 2px solid var(--secondary-color);
  color: var(--secondary-color);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.header__button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.header__button:hover {
  background: var(--secondary-color);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.header__button:hover::before {
  left: 100%;
}

/* Estado activo */
.header__button.active {
  background: var(--secondary-color);
  color: var(--white);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.header__button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 3px;
  background: var(--accent-color);
  border-radius: 2px;
}

/* Efectos de focus para accesibilidad */
.header__button:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.header__logo:focus {
  outline: none;
  outline-offset: 0;
  border-radius: 4px;
}

/* Responsive design */
@media (max-width: 768px) {
  .header__container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  .header__logo {
    font-size: 1.75rem;
  }
  
  .header__nav {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  
  .header__button {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    flex: 0 1 calc(50% - 0.5rem);
    min-width: 0;
    max-width: calc(50% - 0.5rem);
    margin-left: 0rem;
    box-sizing: border-box;
  }
}

@media (max-width: 480px) {
  .header__container {
    padding: 0.75rem;
    width: 100%;
  }
  
  .header__logo {
    font-size: 1.5rem;
  }
  
  .header__nav {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    box-sizing: border-box;
  }
  
  .header__button {
    width: 100%;
    max-width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    margin-left: 0rem;
    box-sizing: border-box;
  }
}

`;