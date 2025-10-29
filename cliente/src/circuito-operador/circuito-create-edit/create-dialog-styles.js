import { css } from 'lit';

export const CreateDialogStyles = css`
  .create-dialog {
    all: unset;
    display: block;
    position: fixed;
    top: 10%;
    left: 10%;
    width: 80%;
    max-height: 80%;
    overflow: auto;
    background: var(--white);
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
  }

  .create-dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  .dialog-content {
    background: var(--white, #fff);
    padding: 1.5rem;

  }

  .create-dialog h2 {
    margin: 0 0 1rem 0;
    color: #ffffffff;
    font-size: 1.5rem;
  }

  .popup-close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .popup-close-button:hover {
    background: #f0f0f0;
    color: #333;
  }

  .form-section {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .form-section h3 {
    margin: 0 0 12px 0;
    color: #677eea;
    font-size: 16px;
    font-weight: 600;
  }

  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    width: 80%;
  }

  .form-group label {
    min-width: 120px;
    margin-right: 8px;
    flex-shrink: 0;
  }

  .form-group input,
  .form-group select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius, 4px);
    font-size: 1rem;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #677eea;
    box-shadow: 0 0 0 2px rgba(103, 126, 234, 0.1);
  }

  .field-error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .error {
    background: #fee;
    border: 1px solid #e74c3c;
    color: #e74c3c;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    width: 80%;
    flex-wrap: wrap;
  }

  .form-row .form-group {
    flex: 1;
    min-width: 200px;
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
    background: var(--secondary-color, #95a5a6);
    color: var(--white, #fff);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius, 4px);
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .btn-cancel:hover:not(:disabled) {
    background: #e74c3c;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  }

  .btn-save {
    background: var(--secondary-color, #2ecc71);
    color: var(--white, #fff);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius, 4px);
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .btn-save:hover:not(:disabled) {
    background: #27ae60;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
  }

  .btn-save:disabled,
  .btn-cancel:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;