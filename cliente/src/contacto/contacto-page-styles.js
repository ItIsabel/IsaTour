import { css } from 'lit';

export const Styles = css`
  .contacto-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .contacto-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  input, textarea {
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #007bff;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-button {
    background: #007bff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-button:hover {
    background: #0056b3;
  }

  .submit-button:active {
    background: #004085;
  }

  @media (max-width: 768px) {
    .contacto-container {
      padding: 1rem;
      margin: 1rem;
    }
    
    h1 {
      font-size: 2rem;
    }
  }
`;
