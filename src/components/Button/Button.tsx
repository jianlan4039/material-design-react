// src/Button.tsx
import React from 'react';
import './Button.scss'

export interface ButtonProps {
    label: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button className={'button'} type="button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
