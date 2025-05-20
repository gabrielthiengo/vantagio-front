import { OctagonX } from 'lucide-react';

type CardFeedbackProps = {
  text: string;
};

export default function CardFeedback({ text }: CardFeedbackProps) {
  return (
    <div className="border rounded-md p-4 mt-3 flex flex-col items-center justify-center gap-2">
      <OctagonX size={42} className="text-gray-200" />
      <span className="text-gray-500">{text}</span>
    </div>
  );
}
