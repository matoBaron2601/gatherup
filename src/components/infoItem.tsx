import { ReactNode } from "react"

type InfoItemProps = {
  icon: ReactNode
  label: string
  value: string 
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <p className="text-xs font-medium sm:text-sm">{label}</p>
      <p className="text-xs text-muted-foreground sm:text-sm">{value}</p>
    </div>
  </div>
)

export default InfoItem