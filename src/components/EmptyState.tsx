import { ReactNode } from "react"
import { Button, ButtonProps } from "@/components/ui/button"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  actionProps?: ButtonProps
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionProps
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mb-6 max-w-md text-gray-500">{description}</p>
    {action && (
      <Button {...actionProps}>
        {action}
      </Button>
    )}
  </div>
)
