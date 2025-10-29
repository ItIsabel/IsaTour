import { css } from 'lit';

export const MesSelectorStyles = css`
  .mes-selector {
    margin-bottom: 16px;
  }

  .mes-selector label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .meses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    margin-bottom: 8px;
  }

  .mes-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .mes-checkbox input[type="checkbox"] {
    margin: 0;
  }

  .mes-checkbox label {
    margin: 0;
    cursor: pointer;
    user-select: none;
  }

  .stats {
    font-size: 12px;
    color: #2980b9;
    margin-bottom: 4px;
  }

  .error {
    color: #dc3545;
    font-size: 14px;
    margin-top: 4px;
  }

  .selected-meses {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 8px;
  }

  .mes-tag {
    background: #2980b9;
    color: white;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 12px;
  }
`;
