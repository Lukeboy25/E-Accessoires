import { RefAttributes } from 'react';

interface InputProps extends RefAttributes<HTMLInputElement> {
    error?: string;
}

export type HTMLInputProps = JSX.IntrinsicElements['input'] & InputProps;
