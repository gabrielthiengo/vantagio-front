import { MoveLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IPageHeaderProps {
  title: string;
  icon: ReactNode;
  previousPage?: string;
  breadcrumb?: ReactNode;
  children?: ReactNode;
  content?: ReactNode;
}

export const PageHeader = (props: IPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Card className="rounded mb-5 shadow-none border border-gray-300">
      <CardHeader className="page-header">
        {props.breadcrumb && <div>{props.breadcrumb}</div>}

        <div>
          {props.previousPage && (
            <div
              className="flex items-center gap-1 cursor-pointer mb-1"
              onClick={() => navigate(props.previousPage ?? '')}
            >
              <MoveLeft size={14} /> <span className="text-sm">Voltar</span>
            </div>
          )}
          <div className="flex gap-3">
            {props.icon}
            <span className="m-0">{props.title}</span>
          </div>
        </div>

        {props.children}
      </CardHeader>

      {props.content && <CardContent>{props.content}</CardContent>}
    </Card>
  );
};
