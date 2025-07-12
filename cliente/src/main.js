import './components/app-header.js';
import './components/circuito-lista.js';
import './components/ciudad-lista.js';
import './components/buscar.js';

// Importar el componente principal al final
import './app.js';

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Todos los componentes han sido registrados');
    
    // Verificar que todos los elementos estén registrados
    const elements = [
        'my-app',
        'app-header', 
        'page-circuits',
        'page-cities',
        'buscar-circuitos'
    ];
    
    elements.forEach(elementName => {
        if (customElements.get(elementName)) {
            console.log(`✓ ${elementName} registrado correctamente`);
        } else {
            console.error(`✗ ${elementName} NO está registrado`);
        }
    });
});