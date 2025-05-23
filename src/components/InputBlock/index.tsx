import { ReactElement } from 'react';
import { Label } from '../ui/label';

type InputBlockProps = {
  label: string;
  isRequired?: boolean;
  htmlFor?: string;
  children: ReactElement;
};

export default function InputBlock({ label, htmlFor, isRequired, children }: InputBlockProps) {
  return (
    <div className="w-full">
      <Label htmlFor={htmlFor ?? ''} className="text-gray-700 text-xs">
        {label}
        {isRequired && (
          <span className="ml-1 text-gray-400" style={{ fontSize: '10px' }}>
            (Obrigatório)
          </span>
        )}
      </Label>

      {children}
    </div>
  );
}
