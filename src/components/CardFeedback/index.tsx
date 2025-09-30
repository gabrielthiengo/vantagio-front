import { cn } from '@/lib/utils';
import { OctagonX } from 'lucide-react';

type CardFeedbackProps = {
  text: string;
  className?: string;
};

export default function CardFeedback({ text, className }: CardFeedbackProps) {
  return (
    <div className={`border rounded-md p-4 flex flex-col items-center justify-center gap-2 w-full ${cn(className)}`}>
      <OctagonX size={42} className="text-gray-200" />
      <span className="text-gray-500">{text}</span>
    </div>
  );
}
