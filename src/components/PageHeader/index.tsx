import { Card, CardContent, CardHeader } from '../ui/card';
import { ReactNode } from 'react';

interface IPageHeaderProps {
  title: string;
  icon: ReactNode;
  breadcrumb?: ReactNode;
  children?: ReactNode;
  content?: ReactNode;
}

export const PageHeader = (props: IPageHeaderProps) => {
  return (
    <Card className="rounded mb-5">
      <CardHeader className="page-header">
        {props.breadcrumb && <div>{props.breadcrumb}</div>}
        <div className="flex gap-3">
          {props.icon}
          <span className="m-0">{props.title}</span>
        </div>

        {props.children}
      </CardHeader>

      {props.content && <CardContent>{props.content}</CardContent>}
    </Card>
  );
};
