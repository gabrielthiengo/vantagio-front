import { ReactElement } from 'react';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Info } from 'lucide-react';

type InputBlockProps = {
  label: string;
  isRequired?: boolean;
  htmlFor?: string;
  children: ReactElement;
  info?: string;
};

export default function InputBlock({ label, htmlFor, isRequired, children, info }: InputBlockProps) {
  return (
    <div className="w-full flex flex-col">
      <Label htmlFor={htmlFor ?? ''} className="text-gray-700 text-xs flex items-center gap-1">
        {label}
        {isRequired && (
          <span className=" text-gray-400" style={{ fontSize: '10px' }}>
            (Obrigatório)
          </span>
        )}

        {info && (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Info size={14} />
              </TooltipTrigger>
              <TooltipContent className="w-[300px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Label>

      {children}
    </div>
  );
}
