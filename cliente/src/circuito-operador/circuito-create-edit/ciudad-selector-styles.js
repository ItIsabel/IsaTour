import { css } from 'lit';

export const CiudadSelectorStyles = css`
  .ciudad-selector {
    position: relative;
    width: 100%;
  }

  .selected-ciudades {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
    min-height: 32px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f9f9f9;
  }

  .ciudad-tag {
    display: flex;
    align-items: center;
    background: #2980b9;
    color: white;
    padding: 4px 8px;
    border-radius: 16px;
    font-size: 14px;
  }

  .ciudad-tag button {
    background: none;
    border: none;
    color: white;
    margin-left: 8px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
  }

  .filter-container {
    position: relative;
  }

  .filter-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .filter-input {
    color: #2c3e50;
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .filter-row select {
    flex: 0 0 auto;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background: white;
    color: #2c3e50;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    color: #2c3e50;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .dropdown-item {
    padding: 8px 12px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }

  .dropdown-item:hover {
    background: #c4e0fbbc;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .no-results {
    padding: 8px 12px;
    color: #666;
    font-style: italic;
  }

  .loading {
    padding: 8px 12px;
    color: #666;
  }

  .error {
    color: #dc3545;
    font-size: 14px;
    margin-top: 4px;
  }

  .stats {
    font-size: 12px;
    color: #2980b9;
    margin-top: 4px;
  }
`;
