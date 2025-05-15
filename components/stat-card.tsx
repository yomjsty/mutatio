import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ElementType } from "react";

interface StatCardProps {
    title: string;
    icon: ElementType;
    value: string | number;
    description: string;
}

export function StatCard({ title, icon: Icon, value, description }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {/* <p className="text-xs text-muted-foreground">{description} from last month</p> */}
            </CardContent>
        </Card>
    );
}
