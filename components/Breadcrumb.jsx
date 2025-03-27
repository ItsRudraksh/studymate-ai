import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export function BreadcrumbNav({ items }) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/dashboard"
            className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === items.length - 1 ? (
              <BreadcrumbPage className="capitalize">
                {item.label}
              </BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink
                  className="capitalize"
                  href={item.href}>
                  {item.label}
                </BreadcrumbLink>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
