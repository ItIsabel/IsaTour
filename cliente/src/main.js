import './header/app-header.js';
import './circuito/circuito-lista.js';
import './ciudad/ciudad-lista.js';

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
    ];
    
    elements.forEach(elementName => {
        if (customElements.get(elementName)) {
            console.log(`✓ ${elementName} registrado correctamente`);
        } else {
            console.error(`✗ ${elementName} NO está registrado`);
        }
    });
});